
import { createStore,combineReducers } from 'redux'
import userReducer from './userReducer'
import countReducer from './countReducer'

const reducers = combineReducers({
    user:userReducer,
    count:countReducer
});

export default reducers;
