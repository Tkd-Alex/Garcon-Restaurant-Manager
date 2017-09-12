import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOGOUT,
         SIGNUP_USER_START, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL,
         UPDATE_USER_START, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL } from './types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Server from '../constants/Server';

let server = Server.address;
let port = Server.port;

const resetAction = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [
    NavigationActions.navigate({ routeName: 'tabNavigation'})
  ]
})

export const registerUser = (userInfo, navigation) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER_START });
    fetch('http://' + server + ':' + port + '/api/auth/register', {
           method: 'POST',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
           body: JSON.stringify({ fullname: userInfo.fullname,
                                  email: userInfo.mail,
                                  password: userInfo.password,
                                  age: userInfo.age,
                                  sex: userInfo.userSex,
                                })
          })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error) registerUserFail(dispatch, responseJson.error)
        else registerUserSuccess(dispatch, responseJson, navigation)
      })
      .catch((error) => { registerUserFail(dispatch, error) });
  }
};

export const registerUserSuccess = (dispatch, responseJson, navigation) => {
  dispatch({ type: SIGNUP_USER_SUCCESS });
  console.log(responseJson);
  Toast.show({ text: "Utente " + responseJson.user.fullname + " registrato.", position: 'bottom', buttonText: 'Ok', duration: 4000, type: 'success' })
  loginUserSuccess(dispatch, responseJson, navigation)
}

export const registerUserFail = (dispatch, error) => {
  dispatch({ type: SIGNUP_USER_FAIL, payload: error });
  Toast.show({ text: error, position: 'bottom', duration: 3000, type: 'danger' })
}

export const loginUser = (userInfo, navigation) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    fetch('http://' + server + ':' + port + '/api/auth/login', {
           method: 'POST',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
           body: JSON.stringify({ email: userInfo.mail,
                                  password: userInfo.password
                                })
          })
      .then((response) => response.json())
      .then((responseJson) => { loginUserSuccess(dispatch, responseJson, navigation) })
      .catch((error) => { loginUserFail(dispatch, error) });
  }
};

export const loginUserSuccess = (dispatch, responseJson, navigation) => {
  //let userLogged = responseJson.user;
  //userLogged.token = responseJson.token;
  dispatch({ type: LOGIN_USER_SUCCESS, payload: responseJson });
  try {
    AsyncStorage.setItem('garcon-token', responseJson.token, () => {
      navigation.dispatch(resetAction)
    });
  } catch (error) {
    console.log("Error to save data on AsyncStorage")
  }
}

export const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
  Toast.show({ text: "Qualcosa è andato storto. Probabilmente i dati non sono corretti", position: 'bottom', duration: 3000, type: 'danger' })
  //console.log(error);
}

export const updateUser = (token, idRestaurant) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_USER_START });
    fetch('http://' + server + ':' + port + '/api/auth/update', {
           method: 'PUT',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': token
                    },
           body: JSON.stringify({ defaultRestaurant: idRestaurant })
          })
      .then((response) => response.json())
      .then((responseJson) => { updateUserSuccess(dispatch, responseJson) })
      .catch((error) => { updateUserFail(dispatch, error) });
  }
};

export const updateUserSuccess = (dispatch, responseJson) => {
  dispatch({ type: UPDATE_USER_SUCCESS, payload: responseJson.result });
  Toast.show({ text: responseJson.message, position: 'bottom', duration: 3000, type: 'success' })
}

export const updateUserFail = (dispatch, error) => {
  dispatch({ type: UPDATE_USER_FAIL, payload: error });
  Toast.show({ text: "Qualcosa è andato storto. Probabilmente i dati non sono corretti", position: 'bottom', duration: 3000, type: 'danger' })
}
