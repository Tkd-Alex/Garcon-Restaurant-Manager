import { FOOD_FETCH_START, FOOD_FETCH_ERROR, FOOD_FETCH_SUCCESS } from '../actions/types'

let initialState = {
  typeProduct: null,
  listProduct: [],
  error: null,
  isLoading: false
}

export default foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOOD_FETCH_START:
      return {...state, isLoading: true};
    case FOOD_FETCH_ERROR:
      return {...state, isLoading: false, error: action.payload};
    case FOOD_FETCH_SUCCESS:
      return {typeProduct: "Food", listProduct: action.payload, isLoading: false};
    default:
      return state;
  }
}
