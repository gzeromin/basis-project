import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Descriptions } from 'antd';
import { addToCart } from '../../../../../_actions/product_action'
function ProductInfo(props) {
  const dispatch = useDispatch();
  
  const clickHandler = () => {
    // input need info to cart field
    dispatch(addToCart(props.detail._id));
  };

  return (
    <div>
      <Descriptions title='Product Info'>
        <Descriptions.Item label='Price'>{props.detail.price}</Descriptions.Item>
        <Descriptions.Item label='Sold'>{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label='View'>{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label='Description'>{props.detail.description}</Descriptions.Item>
      </Descriptions>
      <br/>
      <br/>
      <br/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='large' shape='round' type='danger' onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductInfo;
