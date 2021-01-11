import axios from 'axios';
import {
  ADD_TO_CART
} from "./types";

export function addToCart(id) {
  let body = {
    productId: id
  };

  const request = axios.post('/api/product/addToCart', body).then(res => res.data);
  return {
    type: ADD_TO_CART,
    payload: request
  }
}