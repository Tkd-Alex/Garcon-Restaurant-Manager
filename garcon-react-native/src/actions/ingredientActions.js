import { INGREDIENT_FETCH_START, INGREDIENT_FETCH_SUCCESS, INGREDIENT_FETCH_ERROR} from './types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Server from '../constants/Server';

let server = Server.address;
let port = Server.port;

export const fetchIngredient = (type) => {
  return (dispatch) => {
    dispatch({ type: INGREDIENT_FETCH_START });

    fetch('http://' + server + ':' + port + '/api/ingredient', {
           method: 'GET',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { fetchIngredientSuccess(dispatch, responseJson, type) })
      .catch((error) => { fetchIngredientFail(dispatch, error) });
  }
};

export const fetchIngredientSuccess = (dispatch, responseJson, type) => {
  dispatch({ type: INGREDIENT_FETCH_SUCCESS, payload: responseJson.result });
}

export const fetchIngredientFail = (dispatch, error) => {
  dispatch({ type: INGREDIENT_FETCH_ERROR });

  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}
