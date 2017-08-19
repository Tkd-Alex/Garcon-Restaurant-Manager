import { combineReducers } from 'redux';
import authReducer from './authReducer';
import foodReducer from './foodReducer';
import drinkReducer from './drinkReducer';
import orderReducer from './orderReducer';
import ingredientReducer from './ingredientReducer';

const appReducer = combineReducers({
  auth: authReducer,
  food: foodReducer,
  drink: drinkReducer,
  order: orderReducer,
  ingredient: ingredientReducer
})

export default appReducer;
