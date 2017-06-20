import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { createLogger } from 'redux-logger'
import thunk  from 'redux-thunk'
import { applyMiddleware,createStore } from 'redux'
import routeReducers from '../reducers/routeReducers'
import {Provider} from 'react-redux';
import Login from '../login/login';



//use redux-logger
const logger = createLogger();

//combine middleware
const middleware = applyMiddleware(thunk,logger);

//建立 store 
//第一個參數為 reducer , 第二個為初始值
const store = createStore(routeReducers, {},middleware);

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const store = createStoreWithMiddleware(routeReducers);

class App extends Component {
    render() {
        return (
            <div>
                test123456
                <Login test='123'></Login>

            </div>
        );
    }
}

App.propTypes = {

};
console.log($);

render(
     <App />,
    document.getElementById('app')
);


//當 state 改變,就更新 UI
/*store.subscribe(()=>{
    console.log('subscribe state:');
    console.log(store.getState());
})*/

//UI(button) 發 action
/*store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.INC,payload:1});
store.dispatch({type:types.INC,payload:1});*/

//使用 thunk, 讓 store 能同時 dispatch 多個 action 範例
/*store.dispatch((dispatch)=>{
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
});*/