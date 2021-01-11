import React, { useEffect, useState } from 'react';
import { getQueryString } from '../../../../utils/stringUtils';
import axios from 'axios';
import style from './DetailPage.module.scss';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function DetailPage(props) {
  const productId = getQueryString(props.location.search)['id'];
  const [Product, setProduct] = useState({});
  
  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(res => {
      if(res.data.success) {
        setProduct(res.data.product[0]);
      } else {
        alert('Fail to get detail info');
      }
    });
  }, []);
  
  return (
    <div className={`overflow-y ${style.wrapper}`}>
      <div className={style.title}>
        <h1>{Product.title}</h1>
      </div>
      <br/>
      <Row gutter={[32, 32]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  )
}

export default DetailPage;
