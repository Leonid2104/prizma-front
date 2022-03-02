import React from 'react';
import ReactDOM from 'react-dom';
//import { ReactDOM } from 'react';
import store from './redux/redux-store.js';
import './index.css';
import App from './App.js';
import "./App.css"
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import 'typeface-roboto'



  ReactDOM.render(
    <BrowserRouter>
      <Provider store = {store}>
        <React.StrictMode>
          <App className = "BodyAll"  store = {store}  dispatch ={store.dispatch.bind(store)} />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>

      , document.getElementById('root') );



