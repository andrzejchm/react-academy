import { doRequest, ENDPOINTS, POST } from './rest_api';

export const USER_LOGIN = 'LOGIN';
export const USER_LOGOUT = 'LOGOUT';
export const USER_REGISTER = 'REGISTER';

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}

export function login(credentials) {
  return doRequest(POST, USER_LOGIN, ENDPOINTS.login,
    {
      username: credentials.username,
      password: credentials.password,
    });
}

export function register(credentials) {
  return doRequest(POST, USER_REGISTER, ENDPOINTS.register,
    {
      username: credentials.username,
      password: credentials.password,
    });
}
