import * as types from '../actions/actionType'


const initState = {
    user:[],
    fetching:false,
    fetched:false,
    error:null
}

 const userReducer = (state=initState, action) => {
     console.log(action);
    switch(action.type){
        case types.FITCH_USER_START:{
            state = Object.assign({},state,{fetching:true})
            break;
        }
        case types.FITCH_USER:{
            state = Object.assign({},state,{user:action.payload,fetching:false,fetched:true})      
            break; 
        }
        case types.FITCH_USER_ERROR:{
            state = Object.assign({},state,{error:action.payload,fetching:false})      
            break; 
        }
    }
    return state;
};

export default userReducer;