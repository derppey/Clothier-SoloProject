import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
} from "react-router-dom";

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Router> 
  <Provider store={store}>
    <App />
  </Provider>,
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
