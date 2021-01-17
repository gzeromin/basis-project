import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCardBlock from './Sections/UserCardBlock';
import axios from 'axios';
import { Empty, Result } from 'antd';
import { updateCartInfo, onSuccessBuy } from '../../../../_actions/product_action';
import Paypal from '../../../commons/Paypal/Paypal';

function CartPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [CartDetail, setCartDetail] = useState([]);

  useEffect(() => {
    let cartItems = [];
    // check whether the product is in cart of product state of redux
    if(user && user.userData && user.userData.cart) {
      if(user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        getCartDetail(cartItems, user.userData.cart);
        
      }
    }
  }, [user]);

  let calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity
    });
    setTotal(total);
    setShowTotal(true);
  }

  const getCartDetail = async (cartItems, userCart) => {
    const result = await axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`).then(res => {
      userCart.forEach(cartItem => {
        res.data.product.forEach((productDetail, index) => {
          if(cartItem.id === productDetail._id) {
            res.data.product[index].quantity = cartItem.quantity
          }
        });
      });
      return res.data.product;
    });
    setCartDetail(result);
    calculateTotal(result);
  };

  let removeFromCart = async (productId) => {
    const result = await axios.get(`/api/product/removeFromCart?id=${productId}`).then(res => {
      res.data.cart.forEach(item => {
        res.data.productInfo.forEach((product, index) => {
          if(item.id === product._id) {
            res.data.productInfo[index].quantity = item.quantity;
          }
        })
      })
      return res.data;
    });
    setCartDetail(result.productInfo);
    calculateTotal(result.productInfo);
    dispatch(updateCartInfo(result.cart));
  }

  const transactionSuccess = (data) => {
    dispatch(onSuccessBuy({
      paymentData: data,
      cartDetail: CartDetail
    })).then(res => {
      console.log(res);
      if(res.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
        setCartDetail([]);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock products={CartDetail} removeItem={removeFromCart}/>
      </div>

      {ShowTotal ? 
        <div style={{ marginTop: '3rem'}}>
          <h2>Total Amount: ${Total}</h2>
        </div>
        : ShowSuccess ?
          <Result 
            status='success'
            title='Successfully Purchased Items'
          />
          :
          <>
            <br />
            <Empty description={false} />
          </>
      }

      {ShowTotal &&
        <Paypal
          total={Total}
          onSuccess={transactionSuccess}
        />
      }
    </div>
  )
}

export default CartPage;
