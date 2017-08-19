import { INGREDIENT_FETCH_START, INGREDIENT_FETCH_SUCCESS, INGREDIENT_FETCH_ERROR} from '../actions/types'

let initialState = {
  listIngredient: [],
  error: null,
  isLoading: false
}

export default ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_FETCH_START:
      return {...state, isLoading: true};
    case INGREDIENT_FETCH_ERROR:
      return {...state, isLoading: false, error: action.payload};
    case INGREDIENT_FETCH_SUCCESS:
      return {listIngredient: action.payload, isLoading: false};
    default:
      return state;
  }
}
