import { FETCH_START, FETCH_ERROR, DRINK_FETCH_SUCCESS, FOOD_FETCH_SUCCESS } from './types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Server from '../constants/Server';

let server = Server.address;
let port = Server.port;

export const fetchProduct = (type) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    fetch('http://' + server + ':' + port + '/api/product/category/' + type, {
           method: 'GET',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { fetchProductSuccess(dispatch, responseJson, type) })
      .catch((error) => { fetchProductFail(dispatch, error) });
  }
};

export const fetchProductSuccess = (dispatch, responseJson, type) => {
  if (type == "Food") dispatch({ type: FOOD_FETCH_SUCCESS, payload: responseJson.result });
  else dispatch({ type: DRINK_FETCH_SUCCESS, payload: responseJson.result });
}

export const fetchProductFail = (dispatch, error) => {
  dispatch({ type: FETCH_ERROR, payload: error });
  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}
