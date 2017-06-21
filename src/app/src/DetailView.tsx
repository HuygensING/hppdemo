import * as React from "react";

declare const $: any;

export class DetailView extends React.Component<any, any> {
  private viaf_uri: string;
  constructor(props, context) {
    console.log("ctor")
    super();
    this.viaf_uri = this.getViafUri();
    this.state = {showDetail: this.viaf_uri != undefined, data: undefined, tab: 0 };
    setInterval(() => {
      this.setState(previousState => {
        this.viaf_uri = this.getViafUri();
        return { ...previousState, showDetail: this.viaf_uri != undefined};
      });
    }, 100);
  }

  getViafUri() {
    let viaf_uri: string;
    if (window.location.search) {
      viaf_uri = window.location.search.substr(1).split("&").map(part => part.split("=")).filter(part => part[0] === "viaf").map(part => decodeURIComponent(part[1]))[0];
    }
    return viaf_uri;
  }

  componentDidMount() {

    fetch("http://localhost:8080/v5/DUMMY/hpp3demo/graphql", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: `{
          timdata_NDE_HPP_viaf(uri:"${this.viaf_uri}"){
            uri
            owl_sameAs_inverse {
              items {
                ... on  timdata_NDE_HPP_hoogleraren_uva {
                schema_givenName { value type }
                  schema_familyName { value type }
                  tim_dataSetName {
                    value
                    type
                  }
                  tim_postposition { value type }
                  schema_birthDate { value type }
                  schema_deathDate { value type }
                  schema_birthPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                  schema_deathPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                }
                ... on timdata_NDE_HPP_Delftse_hoogleraren { 
                  schema_givenName { value type }
                  schema_familyName { value type }
                  tim_dataSetName {
                    value
                    type
                  }
                  tim_postposition { value type }
                  schema_birthDate { value type }
                  schema_deathDate { value type }
                  schema_birthPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                  schema_deathPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                }
              }
            }
          }
        }`
    }).then(response => {
      return response.json();
    }).then(data => this.setState(prev => ({...prev, data: data})));
  }

  render(): JSX.Element {
    const that = this;
    const activeTab = this.state.tab;
    if (this.state.showDetail) {
      console.log("render detail");
      if (this.state.data) {
        const owl = this.state.data["data"]["timdata_NDE_HPP_viaf"]["owl_sameAs_inverse"]["items"];

        return (<div>
          <div>uri: {this.state.data["data"]["timdata_NDE_HPP_viaf"]["uri"]}</div>
          <ul className="nav nav-tabs">{owl.map((owlItem, i) => <li key={i} className="nav-item"><a onClick={function (e) { that.setState(prevState => ({...prevState, tab: i})) }} className={"nav-link" + (i==activeTab ? " active" : "") } href={"#dataSet_"+i}>{owlItem.tim_dataSetName.value}</a></li>)}</ul>
          <div className="tab-content">
          {owl.map((owlItem, i) => <div key={i} className={"tab-pane" + (i==activeTab ? " active" : "") } id={"dataSet_"+i} role="tabpanel">{this.renderObject(owlItem)}</div>)}
          </div>
          </div>);
      }

      return <div>Loading...</div>;
    } else {
      return <div>{this.props.children}</div>
    }
  } 

  private renderObject(data: {}): JSX.Element {
    let props:JSX.Element[] = [];
    for (const prop of Object.keys(data)) {
      if(data.hasOwnProperty(prop)) {
        // console.log("renderProp: ", prop);
        props.push(this.renderProperty(prop, data[prop]));
      }
    }
    return <div>{props}</div>;
  }

  private renderProperty(name: string, data: any): JSX.Element {
    if(data != null && typeof data === 'object'){
      return <div style={{paddingLeft: 10}}>{name}: {this.renderObject(data)}</div>;
    }
    else {
      return <div style={{paddingLeft: 10}}>{name}: {data}</div>;
    }
    
  }
}