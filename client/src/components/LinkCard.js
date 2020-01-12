import React from 'react';

export const LinkCard = ( {link} ) => {
  return (
    <div className="collection">
      <div className="collection-item">Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></div>
      <div className="collection-item">Исходная ссылка: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></div>
      <div className="collection-item">Количество кликов по ссылке: {link.clicks}</div>
      <div className="collection-item">Дата создания: {new Date(link.date).toLocaleDateString()}</div>
    </div>
  )

}