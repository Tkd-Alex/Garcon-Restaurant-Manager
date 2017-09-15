import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOGOUT,
         SIGNUP_USER_START, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL,
         UPDATE_USER_START, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, ADD_WAITER_SUCCESS } from '../actions/types'

let initialState = {
  user: null,
  token: "",
  error: null,
  isLoading: false,
  isLogged: false,
}

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {...state, isLoading: true, error: null};
    case LOGIN_USER_SUCCESS:
      return {...state, isLoading: false, error: null, user: action.payload.user, token: action.payload.token};
    case LOGIN_USER_FAIL:
      return {...state, isLoading: false, error: action.payload};
    case LOGIN_USER_LOGOUT:
      return {...state, user: null, token: ""};
    case UPDATE_USER_START:
      return {...state, isLoading: true, error: null};
    case UPDATE_USER_SUCCESS:
      return {...state, isLoading: false, error: null, user: action.payload};
    case UPDATE_USER_FAIL:
      return {...state, isLoading: false, error: action.payload};
    case SIGNUP_USER_START:
      return {...state, isLoading: true};
    case SIGNUP_USER_SUCCESS:
      return {...state, isLoading: false};
    case SIGNUP_USER_FAIL:
      return {...state, isLoading: false, error: action.payload};
    case ADD_WAITER_SUCCESS:
      return {...state, isLoading: false, error: null};
    default:
      return state;
  }
}
