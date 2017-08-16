import { ORDER_FETCH_START, ORDER_FETCH_SUCCESS, ORDER_FETCH_ERROR,
         ORDER_NEW_START, ORDER_NEW_SUCCESS, ORDER_NEW_ERROR,
         EDIT_PRODUCT, ADD_PRODUCT, REMOVE_PRODUCT ,INRECREMENT_PRODUCT, DECREMENT_PRODUCT } from '../actions/types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Server from '../constants/Server';

let server = Server.address;
let port = Server.port;

export const fetchOrder = (type) => {
  return (dispatch) => {
    dispatch({ type: ORDER_FETCH_START });
    fetch('http://' + server + ':' + port + '/api/product/category/' + type, {
           method: 'GET',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { fetchOrderSuccess(dispatch, responseJson, type) })
      .catch((error) => { fetchOrderFail(dispatch, error) });
  }
};

export const fetchOrderSuccess = (dispatch, responseJson, type) => {
  dispatch({ type: ORDER_FETCH_SUCCESS, payload: responseJson.result });
}

export const fetchOrderFail = (dispatch, error) => {
  dispatch({ type: ORDER_FETCH_ERROR });

  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}

export const newOrder = () => {
  dispatch({ type: ORDER_NEW_START });
}

export const newOrderSuccess = () => {
  dispatch({ type: ORDER_NEW_SUCCESS });
}

export const newOrderFail = () => {
  dispatch({ type: ORDER_NEW_ERROR });
}

export const editProduct = () => {
  dispatch({ type: EDIT_PRODUCT });
}

export const addProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT, payload: product });
  }
}

export const removeProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_PRODUCT, payload: product });
  }
}

export const incrementProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: INRECREMENT_PRODUCT, payload: product });
  }
}

export const decrementProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: DECREMENT_PRODUCT, payload: product  });
  }
}
