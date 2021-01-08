import React from 'react';
import style from './GridCards.module.scss';

function GridCards(props) {
  if(props.moviePage) {
    return (
      <div className={style.grid}>
        <a href={`/movie/detail?id=${props.movieId}`}>
          <img 
            className={style['grid-image']}
            src={props.image} 
            alt={props.movieName} 
          />
        </a>
      </div>
    )
  } else {
    return (
      <div className={style.grid}>
        <img 
         className={style['grid-image']}
          src={props.image} 
          alt={props.characterName} 
        />
      </div>
    )
  }
}

export default GridCards;