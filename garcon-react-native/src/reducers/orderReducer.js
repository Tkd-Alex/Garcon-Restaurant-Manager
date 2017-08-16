import { ORDER_FETCH_START, ORDER_FETCH_SUCCESS, ORDER_FETCH_ERROR,
         ORDER_NEW_START, ORDER_NEW_SUCCESS, ORDER_NEW_ERROR,
         EDIT_PRODUCT, ADD_PRODUCT, REMOVE_PRODUCT, INRECREMENT_PRODUCT, DECREMENT_PRODUCT } from '../actions/types'

let initialState = {
  listOrder: [],
  error: null,
  isLoading: false
}

export default orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FETCH_START:
      return state;
    case ORDER_FETCH_SUCCESS:
      return state;
    case ORDER_FETCH_ERROR:
      return state;
    case ORDER_NEW_START:
      return state;
    case ORDER_NEW_SUCCESS:
      return state;
    case ORDER_NEW_ERROR:
      return state;
    case EDIT_PRODUCT:
      return state;
    case ADD_PRODUCT:
      state.listOrder.push({ product: action.payload, quantity: 1, totalPrice: action.payload.price });
      return {...state};
    case REMOVE_PRODUCT:
      alert('i mia chi bo')
      return state;
    case INRECREMENT_PRODUCT:
      let filterProduct = state.listOrder.filter(order => JSON.stringify(order.product) === JSON.stringify(action.payload));
      state.listOrder[state.listOrder.indexOf(filterProduct[0])].quantity++;
      state.listOrder[state.listOrder.indexOf(filterProduct[0])].totalPrice = state.listOrder[state.listOrder.indexOf(filterProduct[0])].quantity * action.payload.price;
      return {...state};
    case DECREMENT_PRODUCT:
      let filterProduct_2 = state.listOrder.filter(order => JSON.stringify(order.product) === JSON.stringify(action.payload));
      state.listOrder[state.listOrder.indexOf(filterProduct_2[0])].quantity--;
      state.listOrder[state.listOrder.indexOf(filterProduct_2[0])].totalPrice = state.listOrder[state.listOrder.indexOf(filterProduct_2[0])].quantity * action.payload.price;
      return {...state};
    default:
      return state;
  }
}
