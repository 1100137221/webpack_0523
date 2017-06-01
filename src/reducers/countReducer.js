import * as types from '../actions/actionType'

const countReducer = (state = 0, action) => {
    switch(action.type){
        case types.INC:{
            state = state+1;
            return state;
        }
        default:
            return state;
    }
};

export default countReducer;
