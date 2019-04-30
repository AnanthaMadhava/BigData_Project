import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';  
import dropdownReducer from './dropdownReducer';
import customerdropReducer from './customerdropReducer';
import graphReducer from './graphReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    drop: dropdownReducer,
    custdrop: customerdropReducer,
    graph: graphReducer
});