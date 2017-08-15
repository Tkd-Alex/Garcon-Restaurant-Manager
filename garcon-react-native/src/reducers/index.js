import { combineReducers } from 'redux';
import authReducer from './authReducer';
import foodReducer from './foodReducer';
import drinkReducer from './drinkReducer';

const appReducer = combineReducers({
  auth: authReducer,
  food: foodReducer,
  drink: drinkReducer
})

export default appReducer;
