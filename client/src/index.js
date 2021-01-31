import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
const { composeWithDevTools } = require('redux-devtools-extension');

const createStoreWithMiddleware = process.env.NODE_ENV === 'production' 
  ? applyMiddleware(
    promiseMiddleware, 
    ReduxThunk
  )(createStore)
  : composeWithDevTools(applyMiddleware(
    promiseMiddleware, 
    ReduxThunk
  ))(createStore)

ReactDOM.render(
  <Provider
    store = {createStoreWithMiddleware(Reducer)}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
