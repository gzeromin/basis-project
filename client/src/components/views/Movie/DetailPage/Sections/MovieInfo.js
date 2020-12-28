import React from 'react';
import style from './MovieInfo.module.scss';

function MovieInfo(props) {

  let {movie} = props;

  return (
    <div className={style.wrapper}>
      <div className={style['grid']}>
        <div className={style['grid-one1']}>Title</div>
        <div className={style['grid-one2']}>{movie.original_title}</div>
        <div className={style['grid-two1']}>release_date</div>
        <div className={style['grid-two2']}>{movie.release_date}</div>
        <div className={style['grid-three1']}>revenue</div>
        <div className={style['grid-three2']}>{movie.revenue}</div>
        <div className={style['grid-four1']}>runtime</div>
        <div className={style['grid-four2']}>{movie.runtime}</div>
        <div className={style['grid-five1']}>vote_average</div>
        <div className={style['grid-five2']}>{movie.vote_average}</div>
        <div className={style['grid-six1']}>vote_count</div>
        <div className={style['grid-six2']}>{movie.vote_count}</div>
        <div className={style['grid-seven1']}>status</div>
        <div className={style['grid-seven2']}>{movie.status}</div>
        <div className={style['grid-eight1']}>popularity</div>
        <div className={style['grid-eight2']}>{movie.popularity}</div>
      </div>
    </div>
  )
}

export default MovieInfo;
