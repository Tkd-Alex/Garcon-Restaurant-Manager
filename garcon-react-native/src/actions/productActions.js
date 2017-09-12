import { FOOD_FETCH_START, FOOD_FETCH_ERROR, FOOD_FETCH_SUCCESS,
         DRINK_FETCH_START, DRINK_FETCH_ERROR, DRINK_FETCH_SUCCESS } from './types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Server from '../constants/Server';

let server = Server.address;
let port = Server.port;

export const fetchProduct = (type, restaurant, token) => {
  return (dispatch) => {

    if (type == "Food") dispatch({ type: FOOD_FETCH_START });
    else dispatch({ type: DRINK_FETCH_START });

    fetch('http://' + server + ':' + port + '/api/restaurant/' + restaurant._id + '/product/category/' + type, {
           method: 'GET',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': token
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { fetchProductSuccess(dispatch, responseJson, type) })
      .catch((error) => { fetchProductFail(dispatch, error, type) });
  }
};

export const fetchProductSuccess = (dispatch, responseJson, type) => {
  if (type == "Food") dispatch({ type: FOOD_FETCH_SUCCESS, payload: responseJson.result });
  else dispatch({ type: DRINK_FETCH_SUCCESS, payload: responseJson.result });
}

export const fetchProductFail = (dispatch, error, type) => {
  if (type == "Food") dispatch({ type: FOOD_FETCH_ERROR });
  else dispatch({ type: DRINK_FETCH_ERROR });

  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}
