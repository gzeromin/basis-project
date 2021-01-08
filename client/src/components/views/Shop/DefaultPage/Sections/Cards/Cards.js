/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import style from './Cards.module.scss';

var timers = {};

function Cards(props) {

  const renderCards = props.ProductList.map((product, i) => {
    var slideIndex = 0;
    var imagesLength = 0;

    const stopPlay = () => {
      if(timers[i] !== undefined) {
        timers[i].map(timerId => {
          clearTimeout(timerId);
        })
        delete timers[i];
      }
    };

    const currentDiv = (j) => {
      const imagesDiv = document.getElementById('images-' + i) !== null ?
         document.getElementById('images-' + i).children : null;
      const badgesDiv = document.getElementById('badges-' + i) !== null ?
         document.getElementById('badges-' + i).children : null;
      if(imagesDiv === null || badgesDiv === null) return;
      slideIndex = j;
      imagesLength = imagesDiv.length;

      if(imagesLength === 0 || imagesLength === 1) {
        stopPlay();
      }

      if(slideIndex >= imagesLength) { 
        slideIndex = 0; 
      }
      for(var loop = 0; loop < imagesLength; loop++) {
        imagesDiv[loop].style.display = 'none';
        badgesDiv[loop].style.color = 'black';
      }
      
      imagesDiv[slideIndex].style.display = 'block';
      badgesDiv[slideIndex].style.color = 'white';
    };

    const autoPlay = () => {
      const timerId = setInterval(() => {
        //disply next image
        currentDiv(++slideIndex);
      }, 3000);
      if(Object.keys(timers).includes(i.toString())) {
        clearTimeout(timerId);
      } else {
        timers[i] = [timerId];
      }
    }
    
    autoPlay();

    const badgeMouseEnterHandler = (j) => {
      stopPlay();
      currentDiv(j);
    };

    const goDetail = () => {
      props.history.push(`/shop/detail?id=${product._id}`);
    }

    const images = product.images.map((image, j) => 
      <img 
        key={j}
        className={style.image} 
        src={`http://localhost:9090/${image}`}
        style={ j === 0 ? { display : 'block' } : { display : 'none' }}
        onMouseEnter={stopPlay}
        onMouseLeave={autoPlay}
        onClick={goDetail}
      />
    );

    const badges = product.images.map((image, j) => 
      <span
        key={j}
        className={`${style.badge} ${slideIndex === j ? style.slideIndex : ''}`}
        onMouseEnter={() => {badgeMouseEnterHandler(j);}}
        onMouseLeave={autoPlay}
      >
        ●
      </span>
    );

    const description = () => {
      const strLength = 100;
      if(product.description.length > strLength) {
        return product.description.substring(0, strLength) + '...';
      }
      return product.description;
    };

    return (
      <div 
        key={i}
        className={style.card}
      >
        <div id={'images-'+i}>
          {images}
        </div>
        <div 
          className={style.badges}
          id={'badges-'+i}
        >
          {badges}
        </div>
        <div className={style.title}>{product.title}</div>
        <div className={style.desc}>{description()}</div>
        <div className={style.footer}>
          <div className={style.price}>
            price: ${product.price}
          </div>
          <div className={style.writer}>
            writer: {product.writer.name}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={style.wrapper}>
      {renderCards}
    </div>
  )
}

export default Cards;
