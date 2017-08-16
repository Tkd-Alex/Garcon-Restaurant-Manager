import { combineReducers } from 'redux';
import authReducer from './authReducer';
import foodReducer from './foodReducer';
import drinkReducer from './drinkReducer';
import orderReducer from './orderReducer';

const appReducer = combineReducers({
  auth: authReducer,
  food: foodReducer,
  drink: drinkReducer,
  order: orderReducer
})

export default appReducer;
