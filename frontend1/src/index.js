import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {Context} from './context/context'
import store from './store';
import {Provider} from 'react-redux'


ReactDOM.render(
  <BrowserRouter>
  <Context>
    <Provider store={store}>
    <App />
    </Provider>
  </Context>
  </BrowserRouter>,
  document.getElementById("root")
);