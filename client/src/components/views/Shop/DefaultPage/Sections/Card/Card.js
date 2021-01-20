/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState, memo } from 'react';
import style from './Card.module.scss';

function Card(props) {
  const product = props.product;
  var slideIndex = 0;
  var timerId = useRef(null);
  const ImageRef = useRef(null);
  const BadgeRef = useRef(null);

  useEffect(() => {
    autoPlay();
    return () => {
      stopPlay();
    };
  }, []);

  const autoPlay = () => {
    timerId = setInterval(() => {
      //disply next image
      currentDiv(++slideIndex);
    }, 3000);
  }

  const stopPlay = () => {
    clearTimeout(timerId);
  };

  const currentDiv = (j) => {
    if(ImageRef.current.children === null || BadgeRef.current.children === null) return;
    slideIndex = j;
    const imagesLength = ImageRef.current.children.length;

    if(imagesLength === 0 || imagesLength === 1) {
      stopPlay();
    }

    if(slideIndex >= imagesLength) { 
      slideIndex = 0; 
    }
    for(var loop = 0; loop < imagesLength; loop++) {
      ImageRef.current.children[loop].style.display = 'none';
      BadgeRef.current.children[loop].style.color = 'black';
    }
    ImageRef.current.children[slideIndex].style.display = 'block';
    BadgeRef.current.children[slideIndex].style.color = 'white';
  };

  const badgeMouseEnterHandler = (j) => {
    stopPlay();
    currentDiv(j);
  };

  const goDetail = () => {
    props.history.push(`/shop/detail?id=${product._id}`);
  }

  const images = product.images && product.images.map((image, j) => 
    <img 
      key={j}
      className={style.image} 
      src={`http://localhost:9090/${image.thumbnail}`}
      style={ j === 0 ? { display : 'block' } : { display : 'none' }}
      onMouseEnter={stopPlay}
      onMouseLeave={autoPlay}
      onClick={goDetail}
    />
  );

  const badges = product.images && product.images.map((image, j) => 
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
    if(product.description && product.description.length > strLength) {
      return product.description.substring(0, strLength) + '...';
    }
    return product.description;
  };

  return (
    <div
      className={style.card}
    >
      <div ref={ImageRef}>
        {images}
      </div>
      <div 
        className={style.badges}
        ref={BadgeRef}
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
          writer: {product.writer && product.writer.name}
        </div>
      </div>
    </div>
  );
}

export default memo(Card);
