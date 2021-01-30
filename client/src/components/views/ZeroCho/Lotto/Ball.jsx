import React, { memo } from 'react';
import style from './Ball.module.scss';

const Ball = ({number}) => {
  let background;
  if(number <= 10) {
    background = 'red';
  } else if(number <= 20) {
    background = 'orange';
  } else if(number <= 30) {
    background = 'yellow';
  } else if(number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <div
      className={style.ball}
      style={{ background }}
    >
      { number }
    </div>
  )
}

export default memo(Ball);
