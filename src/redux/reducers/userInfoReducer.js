import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from '../actions/userInfoActions';

const initialState = {
  authToken: null,
  username: null,
};

export default function userInfo(state = initialState, action) {
  let newState;
  switch (action.type) {
    case USER_LOGOUT:
      newState = {
        authToken: null,
        username: null,
      };
      return newState;
    case USER_LOGIN:
      newState = {
        authToken: action.credentials.password,
        username: action.credentials.username,
      };
      return newState;
    case USER_REGISTER:
      newState = {
        authToken: action.credentials.password,
        username: action.credentials.username,
      };
      return newState;
    default:
      return state;
  }
}
