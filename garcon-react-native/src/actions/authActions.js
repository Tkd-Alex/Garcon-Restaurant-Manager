import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOGOUT,
         SIGNUP_USER_START, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL } from './types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'

let server = '192.168.0.14'
let port = '3000'

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
      .then((responseJson) => { registerUserSuccess(dispatch, responseJson, navigation) })
      .catch((error) => { registerUserFail(dispatch, error) });
  }
};

export const registerUserSuccess = (dispatch, responseJson, navigation) => {
  dispatch({ type: SIGNUP_USER_SUCCESS });
  Toast.show({ text: "Utente " + responseJson.user.fullname + " registrato, adesso puoi effettuare il login.", position: 'bottom', buttonText: 'Ok', duration: 4000, type: 'success' })
  navigation.goBack()
}

export const registerUserFail = (dispatch, error) => {
  dispatch({ type: SIGNUP_USER_FAIL });
  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
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
  dispatch({ type: LOGIN_USER_SUCCESS });
  try {
    AsyncStorage.setItem('garcon-token', responseJson.token, () => {
      console.log("Ho appena finito");
      navigation.navigate("Home", {})
    });
  } catch (error) {
    console.log("Error to save data on AsyncStorage")
  }
}

export const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL });
  Toast.show({ text: "Qualcosa è andato storto. Probabilmente i dati non sono corretti", position: 'bottom', duration: 3000, type: 'danger' })
  //console.log(error);
}
