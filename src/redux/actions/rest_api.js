import axios from 'axios';
import config from '../../config/config';
import strings from '../../config/strings';

export const STATUS_LOADING = '#loading';
export const STATUS_ERROR = '#error';
export const STATUS_SUCCESS = '#success';
export const STATUS_NONE = '#none';

export const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  repairsList: (dateFrom, dateTo, sortType, assignedUser, showCompleted, showIncomplete) =>
    `/repairs?from=${dateFrom}&to=${dateTo}&sortType=${sortType}&assignedUser=${assignedUser}` +
    `&showIncomplete=${showIncomplete}&showCompleted=${showCompleted}`,
  usersByName: name => `/users/search?username=${name}`,
  removeRepair: id => `/repairs/${id}`,
  proposeRepairComplete: id => `/repairs/${id}/proposeComplete`,
  approveRepairCompletion: id => `/repairs/${id}/approveCompletion`,
  repairDetails: id => `/repairs/${id}`,
  createRepair: '/repairs/create',
  editRepair: id => `/repairs/${id}`,
  postComment: repairId => `/repairs/${repairId}/comments`,
  getComments: repairId => `/repairs/${repairId}/comments`,
  deleteUser: username => `/users/${username}`,
  getUsers: '/users/',
};

export const POST = 'post';
export const GET = 'get';
export const DELETE = 'delete';

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
});

function getAuthHeaders(store) {
  if (store.auth && store.auth.userInfo.token) {
    return { Authorization: `Bearer ${store.auth.userInfo.token}` };
  }
  return {};
}

export function doRequest(method, actionType, path, body = null, callback) {
  return (dispatch, getStore) => {
    dispatch({
      type: actionType + STATUS_LOADING,
      status: STATUS_LOADING,
    });

    instance.request({
      url: path,
      method,
      data: body,
      headers: getAuthHeaders(getStore()),
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          dispatch({
            type: actionType + STATUS_ERROR,
            status: STATUS_ERROR,
            payload: null,
            error: { message: strings.unauthorized, code: -1 },
          });
        } else {
          dispatch({
            type: actionType + STATUS_ERROR,
            status: STATUS_ERROR,
            payload: null,
            error: error.response.data.error,
          });
        }
      } else if (error.request) {
        dispatch({
          type: actionType + STATUS_ERROR,
          status: STATUS_ERROR,
          payload: null,
          error: { message: strings.no_response, code: -1 },
        });
      } else {
        dispatch({
          type: actionType + STATUS_ERROR,
          status: STATUS_ERROR,
          payload: null,
          error: { message: strings.invalid_request, code: -1 },
        });
      }
    }).then((response) => {
      if (response) {
        dispatch({
          type: actionType + STATUS_SUCCESS,
          status: STATUS_SUCCESS,
          payload: response.data.result,
          headers: response.headers,
          error: null,
        });
        if (callback) {
          callback();
        }
      }
    });
  };
}
