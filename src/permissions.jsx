import { USER_ROLE_ADMIN, USER_ROLE_MANAGER } from './model/UserInfo';

export function isLoggedIn(state) {
  return state.username || (state.auth.userInfo && state.auth.userInfo.username);
}

export function isAtLeastManager(state) {
  const userInfo = state.auth ? state.auth.userInfo : state;
  return userInfo.role === USER_ROLE_MANAGER || userInfo.role === USER_ROLE_ADMIN;
}


export function isAtLeastAdmin(state) {
  const userInfo = state.auth ? state.auth.userInfo : state;
  return userInfo.role === USER_ROLE_ADMIN;
}
