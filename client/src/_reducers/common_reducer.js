import {
  IS_LOADING
} from '../_actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return {
        ...state, 
        isLoading: false,
        devMode: false
      };
  }
}