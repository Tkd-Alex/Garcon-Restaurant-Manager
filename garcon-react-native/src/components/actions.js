import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOGOUT,
         SIGNUP_USER_START, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL } from './actionTypes'

export const registerUser = ({ userObject, password }) => {
  return (dispatch) => {
    console.log(userObject);
    dispatch({ type: SIGNUP_USER_START });
  }
};
