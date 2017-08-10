import { combineReducers } from 'redux';
import authReducer from './authReducer';

const appReducer = combineReducers({
  auth: authReducer
})

export default appReducer;