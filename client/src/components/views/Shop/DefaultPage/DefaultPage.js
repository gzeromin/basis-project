/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import style from './DefaultPage.module.scss';
import axios from 'axios';
import Cards from './Sections/Cards/Cards';

function DefaultPage() {

  const [ProductList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = (body) => {
    axios.post('/api/product/products').then(res => {
      if(res.data.success) {
        console.log(res.data.productList);
        setProductList(res.data.productList);
      } else {
        alert('Fail to get product');
      }
    });
  };

  

  return (
    <div className={style.wrapper}>
      <h2>
        Let's Travel Anywhere
        <i className='material-icons'> tour </i>
      </h2>

      {/** Filter */}

      {/** Search */}

      {/** Cards */}
      <Cards ProductList={ProductList} />
      <br/>
      {/** Land more cards */}
    </div>
  )
}

export default DefaultPage;
