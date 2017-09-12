import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOGOUT,
         SIGNUP_USER_START, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL,
         UPDATE_USER_START, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL } from '../actions/types'

let initialState = {
  //user: null,
  user: {
    _id: "598c3fca4dd3095f54762b1d",
    push_token: "ExponentPushToken[Oe9XjQLCJCGddtQDgnOzJU]",
    "defaultRestaurant": {
      "_id": "59b720afdb972e5f62e3bb57",
      "name": "CasaMIA"
    },
    "restaurants": [
        {
            "_id": "59b720afdb972e5f62e3bb57",
            "name": "CasaMIA"
        },
        {
            "_id": "59b817c7fe38427158cd58fb",
            "name": "UNICT MENSA"
        }
    ]
  },
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
    default:
      return state;
  }
}
