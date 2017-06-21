import * as React from "react";
import * as _ from "lodash";

export const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let encodedUri = encodeURI(props.uri);
  let url = "http://localhost:8080/v5/DUMMY/hpp3demo/graphql?query=%7B%0A%20%20timdata_NDE_HPP_viaf(uri%3A%22"+encodedUri+"%22)%7B%0A%20%20%20%20uri%0A%20%20%20%20owl_sameAs_inverse%20%7B%0A%20%20%20%20%20%20items%20%7B%0A%20%20%20%20%20%20%20%20...%20on%20%20timdata_NDE_HPP_hoogleraren_uva%20%7B%0A%20%20%20%20%20%20%20%20%20schema_givenName%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_familyName%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20tim_dataSetName%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20tim_postposition%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_birthDate%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_deathDate%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_birthPlace%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20schema_name%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_deathPlace%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20schema_name%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20...%20on%20timdata_NDE_HPP_Delftse_hoogleraren%20%7B%20%0A%20%20%20%20%20%20%20%20%20%20schema_givenName%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_familyName%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20tim_dataSetName%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20tim_postposition%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_birthDate%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_deathDate%20%7B%20value%20type%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_birthPlace%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20schema_name%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20schema_deathPlace%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20schema_name%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D";
  const source:any = _.extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a href={url} target="_blank">
        <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster} width="170" height="240"/>
        <div data-qa="title" className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}>
        </div>
      </a>
    </div>
  )
}

export const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props;
  let encodedUri = encodeURIComponent(result._source.uri);
  let url = window.location.href;
  if (window.location.search) {
    url += "&viaf="
  } else {
    url += "?viaf="
  }
  url += encodedUri;
  const source:any = _.extend({}, result._source, result.highlight);
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("details")}>
        <a href={url}><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.owl_sameAs_inverse.items[0].schema_familyName.value}}></h2></a>
      </div>
    </div>
  )
}

