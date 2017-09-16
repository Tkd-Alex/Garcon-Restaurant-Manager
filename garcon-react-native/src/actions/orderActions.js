import { ORDER_FETCH_START, ORDER_FETCH_SUCCESS, ORDER_FETCH_ERROR,
         ORDER_NEW_START, ORDER_NEW_SUCCESS, ORDER_NEW_ERROR,
         ORDER_UPDATE_START, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_ERROR,
         ORDER_EDIT_START, ORDER_EDIT_SUCCESS, ORDER_EDIT_ERROR,
         EDIT_PRODUCT, ADD_PRODUCT, REMOVE_PRODUCT ,INRECREMENT_PRODUCT, DECREMENT_PRODUCT } from '../actions/types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Server from '../constants/Server';

let server = Server.address;
let port = Server.port;

export const fetchOrder = (restaurant, token) => {
  return (dispatch) => {
    dispatch({ type: ORDER_FETCH_START });
    fetch('http://' + server + ':' + port + '/api/restaurant/' + restaurant._id + '/order', {
           method: 'GET',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': token
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { fetchOrderSuccess(dispatch, responseJson) })
      .catch((error) => { fetchOrderFail(dispatch, error) });
  }
};

export const fetchOrderSuccess = (dispatch, responseJson) => {
  dispatch({ type: ORDER_FETCH_SUCCESS, payload: responseJson.result });
}

export const fetchOrderFail = (dispatch, error) => {
  dispatch({ type: ORDER_FETCH_ERROR });

  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}

export const newOrder = (order, restaurant, token) => {
  return (dispatch) => {
    dispatch({ type: ORDER_NEW_START });
    fetch('http://' + server + ':' + port + '/api/restaurant/' + restaurant._id + '/order', {
           method: 'POST',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': token
                    },
           body: JSON.stringify({ tableNumber: order.tableNumber,
                                  listProduct: order.listProduct,
                                  totalPrice: order.totalPrice,
                                  waiter: order.waiter
                                })
          })
      .then((response) => response.json())
      .then((responseJson) => { newOrderSuccess(dispatch, responseJson) })
      .catch((error) => { newOrderFail(dispatch, error) });
  }
}

export const newOrderSuccess = (dispatch, responseJson) => {
  dispatch({ type: ORDER_NEW_SUCCESS, payload: responseJson.result });
  Toast.show({ text: responseJson.message, position: 'bottom', buttonText: 'Ok', duration: 4000, type: 'success' })
}

export const newOrderFail = (dispatch, error) => {
  dispatch({ type: ORDER_NEW_ERROR });
  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}

export const updateOrder = (order, restaurant, token, navigation) => {
  return (dispatch) => {
    dispatch({ type: ORDER_UPDATE_START });
    let endpoint = order.complete ? "pay" : "complete"
    fetch('http://' + server + ':' + port + '/api/restaurant/' + restaurant._id + '/order/' + endpoint + '/' + order._id , {
           method: 'PUT',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': token
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { updateOrderSuccess(dispatch, responseJson, navigation) })
      .catch((error) => { updateOrderFail(dispatch, error) });
  }
};

export const updateOrderSuccess = (dispatch, responseJson, navigation) => {
  Toast.show({ text: responseJson.message, position: 'bottom', duration: 2500, type: 'success' })
  dispatch({ type: ORDER_UPDATE_SUCCESS, payload: responseJson.result });
  if(navigation) navigation.goBack()
}

export const updateOrderFail = (dispatch, error) => {
  dispatch({ type: ORDER_UPDATE_ERROR, payload: error });
  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}

export const editProduct = (product, index, navigation) => {
  return (dispatch) => {
    dispatch({ type: EDIT_PRODUCT, payload: product, index: index});
    Toast.show({ text: product.name + " modificato!", position: 'bottom', duration: 3000, type: 'success' })
    if(navigation) navigation.goBack()
  }
}

export const addProduct = (product, navigation) => {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT, payload: product });
    Toast.show({ text: product.name + " aggiunto!", position: 'bottom', duration: 3000, type: 'success' })
    if(navigation) navigation.goBack()
  }
}

export const removeProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_PRODUCT, payload: product });
    Toast.show({ text: product.name + " rimosso!", position: 'bottom', duration: 3000, type: 'success' })
  }
}

export const incrementProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: INRECREMENT_PRODUCT, payload: product });
    Toast.show({ text: product.name + " incrementato!", position: 'bottom', duration: 3000, type: 'success' })
  }
}

export const decrementProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: DECREMENT_PRODUCT, payload: product  });
    Toast.show({ text: product.name + " decrementato!", position: 'bottom', duration: 3000, type: 'success' })
  }
}

export const editOrder = (order, restaurant, token, navigation) => {
  return (dispatch) => {
    dispatch({ type: ORDER_EDIT_START });
    fetch('http://' + server + ':' + port + '/api/restaurant/' + restaurant._id + '/order/' + order._id , {
           method: 'DELETE',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': token
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { editOrderSuccess(dispatch, order, navigation) })
      .catch((error) => { editOrderFail(dispatch, error) });
  }
};

export const editOrderSuccess = (dispatch, order, navigation) => {
  dispatch({ type: ORDER_EDIT_SUCCESS, payload: order });
  Toast.show({ text: "Puoi modificare il tuo ordine", position: 'bottom', duration: 3000, type: 'success' })
  navigation.navigate("OrderTab");
}

export const editOrderFail = (dispatch, error) => {
  dispatch({ type: ORDER_EDIT_ERROR });
  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}
