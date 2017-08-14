import { FETCH_START, FETCH_ERROR, DRINK_FETCH_SUCCESS, FOOD_FETCH_SUCCESS } from '../actions/types'

let initialState = {
  typeProduct: null,
  listProduct: [],
  error: null,
  isLoading: false
}

export default productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {...state, isLoading: true};
    case FETCH_ERROR:
      return {...state, isLoading: false, error: action.payload};
    case DRINK_FETCH_SUCCESS:
      return {typeProduct: "Drink", listProduct: action.payload, isLoading: false};
    case FOOD_FETCH_SUCCESS:
      return {typeProduct: "Food", listProduct: action.payload, isLoading: false};
    default:
      return state;
  }
}
