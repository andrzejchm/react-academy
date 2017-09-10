export const USER_LOGIN = 'LOGIN';
export const USER_LOGOUT = 'LOGOUT';
export const USER_REGISTER = 'REGISTER';

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}

export function login(credentials) {
  return {
    type: USER_LOGIN,
    credentials,
  };
}

export function register(credentials) {
  return {
    type: USER_REGISTER,
    credentials,
  };
}
