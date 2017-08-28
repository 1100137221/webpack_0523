import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { createLogger } from 'redux-logger'
import thunk  from 'redux-thunk'
import { applyMiddleware,createStore } from 'redux'
import routeReducers from '../reducers/routeReducers'
import {Provider} from 'react-redux';


import '../scss/thirth.scss'
import '../scss/app.scss'

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
            <div id="hero">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-toggleable-md navbar-inverse">
                            <a href="#" className="navbar-brand text-primary" id="logo">GAMELOGO</a>

                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link text-primary" href="#">Overview</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-primary" href="#">Specs</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-primary" href="#">FAQ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-primary" href="#">Purchase</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="row hero-content pt-lg-6 pb-lg-6 pt-5">
                        <div className='col-md-6 col-sm-12'>
                            <h1 className='text-uppercase text-center text-md-left'>Destroy All Of Humanity</h1>
                            <h1 className='text-uppercase text-center text-md-left'>Capture enmy territory add best theme down like rodent.</h1>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <img src={require('../assets/overlay.png')} alt="" className='hero-img mt-5 mt-md-0'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {

};


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




import TodoList from '../components/TodoList';
import TodoAdd from '../components/TodoAdd';

const todos = [
    {
      task: 'Install packages',
      isCompleted: false
    },
    {
      task: 'Add webpack.config.js',
      isCompleted: false
    },
    {
      task: 'Break UI into components',
      isCompleted: false
    }
];

class TodoApp extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          todos
        };

        this._saveTask = this._saveTask.bind(this);
        this._addTask = this._addTask.bind(this);
        this._deleteTask = this._deleteTask.bind(this);
        this._completeTask = this._completeTask.bind(this);

    }
      
    _saveTask(idx, val) {
        // copy array
        let newTodos = [...this.state.todos];
        // copy object
        newTodos[idx] = Object.assign({}, newTodos[idx], { task: val });
        this.setState({ todos: newTodos });
    }



    _deleteTask(idx) {
        let newTodos = [...this.state.todos];
        newTodos.splice(idx, 1);
        this.setState({ todos: newTodos });
    }

    _addTask(val) {
        // 一樣不能直接修改state
        let newTodos = [...this.state.todos];
        newTodos.push(
          {
            task: val,
            isCompleted: false
          });
        this.setState({ todos: newTodos });
    }
    
    _completeTask(idx) {
        let newTodos = [...this.state.todos];
        newTodos[idx] = Object.assign({}, newTodos[idx], { isCompleted: !newTodos[idx].isCompleted });
        this.setState({ todos: newTodos });
    }


    render() {
        return (
            <div>
                <h1>React Todo List</h1>
                <TodoAdd addTask={this._addTask} />
                <TodoList
                    todos={this.state.todos}
                    saveTask={this._saveTask}
                    deleteTask={this._deleteTask}
                    completeTask={this._completeTask}
                    
                />
            </div>
        );
    }
}


import { bindActionCreators } from 'redux';
import * as TodosActionCreators from '../actions/todo';

class TodoListContainer extends Component {
  render() {
    let todosActionCreators = bindActionCreators(TodosActionCreators);
    return (
      <TodoList {...todosActionCreators} />
    );
  }
}

render(
     <TodoListContainer />,
    document.getElementById('app')
);
