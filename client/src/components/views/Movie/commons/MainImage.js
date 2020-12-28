import React from 'react';
import style from './MainImage.module.scss';

function MainImage(props) {
  return (
    <div style={{
      background: `linear-gradient(to bottom, rgba(0,0,0,0)
                    39%, rgba(0,0,0,0)
                    41%, rgba(0,0,0,0.65)
                    100%),
                    url('${props.image}'), 
                    #1c1c1c`,
      height: '500px',
      backgroundSize: '100%, cover',
      backgroundPosition: 'center, center',
      width: '100%',
      position: 'relative'
    }}>
      <div className={style['info']}>
        <h2 className={style['info-title']}>{props.title}</h2>
        <p className={style['info-text']}>{props.text}</p>
      </div>
    </div>
  )
}

export default MainImage;
