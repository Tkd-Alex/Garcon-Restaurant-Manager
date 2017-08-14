import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOGOUT,
         SIGNUP_USER_START, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL } from '../actions/types'

let initialState = {
  user: null,
  error: null,
  isLoading: false,
  isLogged: false,
}

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {...state, isLoading: true, error: null};
    case LOGIN_USER_SUCCESS:
      return {...state, isLoading: false, error: null, user: action.payload};
    case LOGIN_USER_FAIL:
      return {...state, isLoading: false, error: action.payload};
    case LOGIN_USER_LOGOUT:
      return 0;
    case SIGNUP_USER_START:
      return {...state, isLoading: true};
    case SIGNUP_USER_SUCCESS:
      return {...state, isLoading: false};
    case SIGNUP_USER_FAIL:
      return {...state, isLoading: false, error: action.payload};
    default:
      return state;
  }
}
