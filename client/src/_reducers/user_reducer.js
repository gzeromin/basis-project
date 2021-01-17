import {
  LOGIN_USER, 
  REGISTER_USER, 
  AUTH_USER,
  ADD_TO_CART,
  UPDATE_CART_INFO,
  SET_IMAGE,
  SAVE_IMAGE,
  ON_SUCCESS_BUY
} from '../_actions/types';

export default function (state={}, action) {
  
  switch(action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case SAVE_IMAGE:
      return {...state, userData: {
        ...state.userData,
        image: action.payload.image
      }};
    case REGISTER_USER:
      return {...state, register: action.payload};
    case AUTH_USER:
      return {...state, userData: action.payload};
    case ADD_TO_CART:
      return {...state, userData: {
        ...state.userData,
        cart: action.payload.cart
      }};
    case UPDATE_CART_INFO:
      return {...state, userData: {
        ...state.userData,
        cart: action.payload
      }};
    case ON_SUCCESS_BUY:
      return {...state, userData: action.payload.user};
    default:
      return state;
  }
}