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

    fetch("http://462df71a.ngrok.io/timbuctoo/v5/DUMMY/hpp8demo/graphql", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: `{
        timdata_NDE_HPP_viaf(uri:"${this.viaf_uri}"){
          uri
          owl_sameAs_inverse {
            items {
              timdata_NDE_HPP_hoogleraren_uva_Opmerkingen { value } 
              schema_birthPlace {  
                ... on timdata_NDE_HPP_Places {
                  schema_name { value }  
                } 
              } 
              schema_deathPlace {  
                ... on timdata_NDE_HPP_Places {    
                  schema_name { value }  
                } 
              } 
              tim_ERFGOED { value } 
              schema_deathDate { value } 
              schema_givenName { value }
              tim_postposition { value }
              timdata_NDE_HPP_Hoogleraren_archieven_inventaris__papier__met_titel { value } 
              timdata_NDE_HPP_hoogleraren_uva_Nationaliteit { value } 
              tim_Faculteit_Afdeling { value } 
              timdata_NDE_HPP_hoogleraren_uva_PPNAlgemeen { value } 
              timdata_NDE_HPP_Hoogleraren_archieven_instelling_bewaarplaats { value } 
              schema_familyName { value } 
              timdata_DUMMY_oorlogsgraven_OGS_sub1_Begraafplaats { value } 
              timdata_NDE_HPP_Hoogleraren_archieven_informatie_over_verwerving { value } 
              timdata_DUMMY_oorlogsgraven_OGS_sub1_Bron { value } tim_Ambtsperiode { value } 
              tim_Leeropdracht { value } 
              tim_Aanstelling { value } 
              tim_intraposition { value } 
              schema_birthDate { value } 
              schema_gender { value } 
              tim_dataSetName { value } 
              timdata_NDE_HPP_Hoogleraren_archieven_bewaarplaats { value }
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