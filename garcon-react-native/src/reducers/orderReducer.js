import { ORDER_FETCH_START, ORDER_FETCH_SUCCESS, ORDER_FETCH_ERROR,
         ORDER_NEW_START, ORDER_NEW_SUCCESS, ORDER_NEW_ERROR,
         ORDER_UPDATE_START, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_ERROR,
         ORDER_EDIT_START, ORDER_EDIT_SUCCESS, ORDER_EDIT_ERROR,
         EDIT_PRODUCT, ADD_PRODUCT, REMOVE_PRODUCT, INRECREMENT_PRODUCT, DECREMENT_PRODUCT } from '../actions/types'

let initialState = {
  listProduct: [],
  listOrders: [],
  error: null,
  isLoading: false
}

export default orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FETCH_START:
      return {...state, isLoading: true, error: null};
    case ORDER_FETCH_SUCCESS:
      return {...state, isLoading: false, error: null, listOrders: action.payload};
    case ORDER_FETCH_ERROR:
      return {...state, isLoading: false, error: action.payload};
    case ORDER_NEW_START:
      return {...state, isLoading: true, error: null};
    case ORDER_NEW_SUCCESS:
      state.listProduct = [];
      state.listOrders = state.listOrders.concat(action.payload);
      return {...state, isLoading: false, error: null};
    case ORDER_NEW_ERROR:
      return {...state, isLoading: false, error: action.payload};
    case ORDER_UPDATE_START:
      return {...state, isLoading: true, error: null};
    case ORDER_UPDATE_SUCCESS:
      var index = state.listOrders.map(order => order._id).indexOf(action.payload._id);
      state.listOrders[index] = action.payload;
      return {...state, isLoading: false, error: null};
    case ORDER_UPDATE_ERROR:
      return {...state, isLoading: false, error: action.payload};
    case EDIT_PRODUCT:
      state.listProduct[action.index].product = action.payload;
      return {...state};
    case ADD_PRODUCT:
      state.listProduct.push({ product: action.payload, quantity: 1, totalPrice: action.payload.price });
      return {...state};
    case REMOVE_PRODUCT:
      var index = state.listProduct.map(order => order.product).indexOf(action.payload);
      state.listProduct.splice(index,1);
      return {...state};
    case INRECREMENT_PRODUCT:
      var index = state.listProduct.map(order => order.product).indexOf(action.payload);
      state.listProduct[index].quantity++;
      state.listProduct[index].totalPrice = state.listProduct[index].quantity * action.payload.price;
      return {...state};
    case DECREMENT_PRODUCT:
      var index = state.listProduct.map(order => order.product).indexOf(action.payload);
      state.listProduct[index].quantity--;
      state.listProduct[index].totalPrice = state.listProduct[index].quantity * action.payload.price;
      return {...state};
    case ORDER_EDIT_START:
      return {...state, isLoading: true, error: null};
    case ORDER_EDIT_SUCCESS:
      var index = state.listOrders.map(order => order._id).indexOf(action.payload._id);
      state.listProduct = action.payload.listProduct;
      state.listOrders.splice(index,1);
      return {...state};
    case ORDER_EDIT_ERROR:
      return {...state, isLoading: false, error: action.payload};
    default:
      return state;
  }
}
