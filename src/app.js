/*
import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss'

ReactDOM.render(
  <div className='title' >Hello World!123</div> ,
  document.getElementById('app')); */


import { applyMiddleware,createStore } from 'redux'
import * as types from './actions/actionType'
import routeReducers from './reducers/routeReducers'
import { createLogger } from 'redux-logger'


//use redux-logger
const logger = createLogger();

//combine middleware
const middleware = applyMiddleware(logger);

//建立 store 
//第一個參數為 reducer , 第二個為初始值
const store = createStore(routeReducers, {},middleware);

//當 state 改變,就更新 UI
store.subscribe(()=>{
    console.log('subscribe state:');
    console.log(store.getState());
})

//UI(button) 發 action
store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.CHANGE_NAME,payload:"will"});
store.dispatch({type:types.CHANGE_AGE,payload:11});