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
import thunk  from 'redux-thunk'


//use redux-logger
const logger = createLogger();

//combine middleware
const middleware = applyMiddleware(thunk,logger);

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

//使用 thunk, 讓 store 能同時 dispatch 多個 action 範例
store.dispatch((dispatch)=>{
    dispatch({type:types.FITCH_USER_START});
    fetch("http://rest.learncode.academy/api/wstern/users")
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            return dispatch({type:types.FITCH_USER,payload:json});
        })
        .catch((err)=>{
            return dispatch({type:types.FITCH_USER_ERROR,payload:err});            
        });
});