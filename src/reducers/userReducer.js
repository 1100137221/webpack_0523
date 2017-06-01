import * as types from '../actions/actionType'


 const userReducer = (state={}, action) => {
    switch(action.type){
        case types.CHANGE_NAME:{
            state = Object.assign({},state,{name:action.payload})
            break;
        }
            
        case types.CHANGE_AGE:{
            state = Object.assign({},state,{age:action.payload})      
            break; 
        }
    }
    return state;
};

export default userReducer;