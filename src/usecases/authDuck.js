import {
  STATUS_LOADING, STATUS_SUCCESS, STATUS_NONE, POST, ENDPOINTS, doRequest,
} from '../redux/actions/rest_api';
import UserInfo from '../model/UserInfo';
import { getActionType } from '../utils';

export const ACTION_USER_LOGIN = 'AUTH/LOGIN';
export const ACTION_USER_LOGOUT = 'AUTH/LOGOUT';
export const ACTION_USER_REGISTER = 'AUTH/REGISTER';

export const initialState = {
  userInfo: { ...new UserInfo(null, null, null) },
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
        userInfo: { ...new UserInfo(
          action.payload.username,
          action.headers['access-token'],
          action.payload.role) },
      };
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
  return { ...initialState, status: STATUS_NONE };
}

export default function reducer(state = initialState, action) {
  switch (getActionType(action)) {
    case ACTION_USER_LOGOUT:
      return userLogout();
    case ACTION_USER_LOGIN:
      return userLogin(action);
    case ACTION_USER_REGISTER:
      return userRegister(action);
    default:
      return state;
  }
}

export function logout() {
  return {
    type: ACTION_USER_LOGOUT,
  };
}

export function login(credentials) {
  return doRequest(POST, ACTION_USER_LOGIN, ENDPOINTS.login,
    {
      username: credentials.username,
      password: credentials.password,
    });
}

export function register(credentials) {
  return doRequest(POST, ACTION_USER_REGISTER, ENDPOINTS.register,
    {
      username: credentials.username,
      password: credentials.password,
    });
}

