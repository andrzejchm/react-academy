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
      response: null,
      error: null,
    });

    instance.request({
      url: path,
      method,
      data: body,
    }).catch((error) => {
      if (error.response) {
        dispatch({
          type: actionType,
          status: STATUS_ERROR,
          response: error.response.data,
          error: error.response.data.error,
        });
      } else if (error.request) {
        dispatch({
          type: actionType,
          status: STATUS_ERROR,
          response: null,
          error: { message: strings.no_response, code: -1 },
        });
      } else {
        dispatch({
          type: actionType,
          status: STATUS_ERROR,
          response: null,
          error: { message: strings.invalid_request, code: -1 },
        });
      }
    }).then((response) => {
      if (response) {
        dispatch({
          type: actionType,
          status: STATUS_SUCCESS,
          response: response.data,
          headers: response.headers,
          error: null,
        });
      }
    });
  };
}
