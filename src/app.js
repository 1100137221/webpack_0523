/*
import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss'

ReactDOM.render(
  <div className='title' >Hello World!123</div> ,
  document.getElementById('app')); */


import { createStore } from 'redux'
import * as types from './actions/actionType'
import routeReducers from './reducers/routeReducers'


//建立 store 
//第一個參數為 reducer , 第二個為初始值
const store = createStore(routeReducers, {});

//當 state 改變,就更新 UI
store.subscribe(()=>{
    console.log(store.getState());
})

//UI 發 action
store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.CHANGE_NAME,payload:"will"});
store.dispatch({type:types.CHANGE_AGE,payload:11});