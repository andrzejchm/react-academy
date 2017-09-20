import axios from 'axios';
import config from '../../config/config';
import strings from '../../config/strings';

export const STATUS_LOADING = 'loading';
export const STATUS_ERROR = 'error';
export const STATUS_SUCCESS = 'success';
export const STATUS_NONE = 'none';

export const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  repairsList: (dateFrom, dateTo, sortType) => `/repairs?from=${dateFrom}&to=${dateTo}&sortType=${sortType}`,
};

export const POST = 'post';
export const GET = 'get';

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
});

export function doRequest(method, actionType, path, body = null) {
  return (dispatch) => {
    dispatch({
      type: actionType,
      status: STATUS_LOADING,
    });

    instance.request({
      url: path,
      method,
      data: body,
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          dispatch({
            type: actionType,
            status: STATUS_ERROR,
            payload: null,
            error: { message: strings.unauthorized, code: -1 },
          });
        } else {
          dispatch({
            type: actionType,
            status: STATUS_ERROR,
            payload: null,
            error: error.response.data.error,
          });
        }
      } else if (error.request) {
        dispatch({
          type: actionType,
          status: STATUS_ERROR,
          payload: null,
          error: { message: strings.no_response, code: -1 },
        });
      } else {
        dispatch({
          type: actionType,
          status: STATUS_ERROR,
          payload: null,
          error: { message: strings.invalid_request, code: -1 },
        });
      }
    }).then((response) => {
      if (response) {
        dispatch({
          type: actionType,
          status: STATUS_SUCCESS,
          payload: response.data.result,
          headers: response.headers,
          error: null,
        });
      }
    });
  };
}

export function setAuthToken(token) {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
