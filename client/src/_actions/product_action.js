import axios from 'axios';
import {
  ADD_TO_CART, ON_SUCCESS_BUY, UPDATE_CART_INFO
} from "./types";

export async function addToCart(id) {
  let body = {
    productId: id
  };

  const request = await axios.post('/api/product/addToCart', body).then(res => res.data);
  return {
    type: ADD_TO_CART,
    payload: request
  }
}

export function updateCartInfo(cartInfo) {
  return {
    type: UPDATE_CART_INFO,
    payload: cartInfo
  }
}

export async function onSuccessBuy(data) {
  const request = await axios.post(`/api/product/successBuy`, data).then(res => res.data);
  return {
    type: ON_SUCCESS_BUY,
    payload: request
  }
}