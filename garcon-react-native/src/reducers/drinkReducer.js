import { DRINK_FETCH_START, DRINK_FETCH_ERROR, DRINK_FETCH_SUCCESS } from '../actions/types'

let initialState = {
  typeProduct: null,
  listProduct: [],
  error: null,
  isLoading: false
}

export default drinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRINK_FETCH_START:
      return {...state, isLoading: true};
    case DRINK_FETCH_ERROR:
      return {...state, isLoading: false, error: action.payload};
    case DRINK_FETCH_SUCCESS:
      return {typeProduct: "Drink", listProduct: action.payload, isLoading: false};
    default:
      return state;
  }
}
