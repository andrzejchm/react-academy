import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from '../actions/userInfoActions';

import {
  STATUS_LOADING,
  STATUS_SUCCESS,
  STATUS_NONE, setAuthToken,
} from '../actions/rest_api';
import UserInfo from '../../model/UserInfo';

export const initialState = {
  userInfo: new UserInfo(null, null, null),
  status: STATUS_NONE,
  error: null,
};

function userLogin(action) {
  let newState;
  switch (action.status) {
    case STATUS_LOADING:
      newState = {
        ...initialState,
      };
      break;
    case STATUS_SUCCESS:
      newState = {
        ...initialState,
        userInfo: new UserInfo(
          action.payload.username,
          action.headers['access-token'],
          action.payload.role),
      };
      setAuthToken(newState.userInfo.token);
      break;
    default:
      newState = {
        ...initialState,
        error: action.error,
      };
      break;
  }
  newState.status = action.status;
  return newState;
}

function userRegister(action) {
  return userLogin(action);
}

function userLogout() {
  setAuthToken(null);
  return { ...initialState, status: STATUS_NONE };
}

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return userLogout();
    case USER_LOGIN:
      return userLogin(action);
    case USER_REGISTER:
      return userRegister(action);
    default:
      return state;
  }
}
