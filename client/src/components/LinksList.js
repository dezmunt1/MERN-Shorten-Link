import React from 'react';
import { LinkCard } from '../components/LinkCard'

export const LinksList = ( {links} ) => {
  console.log(links);
  const allLinks = links.map( (item, i )=> <LinkCard link = {item} key={ i + 1 }/>);
  return (
    <>
      {allLinks}
      <div className="collection">
        <div className="collection-item">ЕБАТЬ МОЙ ХУЙ</div>
      </div>
    </>
    
  )

}