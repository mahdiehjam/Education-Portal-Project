import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import showUsersReducer from './showUsersReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    users: showUsersReducer
});