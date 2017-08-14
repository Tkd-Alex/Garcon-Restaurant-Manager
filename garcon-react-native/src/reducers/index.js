import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';

const appReducer = combineReducers({
  auth: authReducer,
  product: productReducer
})

export default appReducer;
