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
      state.listOrder[action.index].product = action.payload;
      return {...state};
    case ADD_PRODUCT:
      state.listOrder.push({ product: action.payload, quantity: 1, totalPrice: action.payload.price });
      return {...state};
    case REMOVE_PRODUCT:
      var index = state.listOrder.map(order => order.product).indexOf(action.payload);
      state.listOrder.splice(index,1);
      return {...state};
    case INRECREMENT_PRODUCT:
      var index = state.listOrder.map(order => order.product).indexOf(action.payload);
      state.listOrder[index].quantity++;
      state.listOrder[index].totalPrice = state.listOrder[index].quantity * action.payload.price;
      return {...state};
    case DECREMENT_PRODUCT:
      var index = state.listOrder.map(order => order.product).indexOf(action.payload);
      state.listOrder[index].quantity--;
      state.listOrder[index].totalPrice = state.listOrder[index].quantity * action.payload.price;
      return {...state};
    default:
      return state;
  }
}
