import PropTypes from 'prop-types';
import { LOCATION_CHANGE } from 'react-router-redux';
import getReducerForApiRequest,
{ initialState as apiInitialState } from './usecases/apiRequestReducer';
import { getActionType } from '../utils';
import { ApiResponseShape } from '../model/ApiResponse';
import { doRequest, ENDPOINTS, GET, DELETE } from '../redux/actions/rest_api';
import { UserShape } from '../model/User';

const PREFIX = 'USERS_LIST';
const ACTION_GET_USERS_LIST = `${PREFIX}/GET_USERS_LIST`;
const ACTION_DELETE_USER = `${PREFIX}/DELETE_USER`;

export const initialState = {
  list: apiInitialState,
};

export default function reducer(state = initialState, action) {
  switch (getActionType(action)) {
    case LOCATION_CHANGE:
      return initialState;
    case ACTION_GET_USERS_LIST:
      return { ...state, list: getReducerForApiRequest(ACTION_GET_USERS_LIST)(state.list, action) };
    default:
      return state;
  }
}

export function getUsersAction() {
  return doRequest(GET, ACTION_GET_USERS_LIST, ENDPOINTS.getUsers);
}

export function removeUserAction(user) {
  return (dispatch, getState) => doRequest(
    DELETE,
    ACTION_DELETE_USER,
    ENDPOINTS.deleteUser(user.username),
    null,
    () => getUsersAction()(dispatch, getState),
  )(dispatch, getState);
}

export const UsersListPropType = PropTypes.shape({
  list: ApiResponseShape(PropTypes.arrayOf(UserShape)),
  typedInComment: PropTypes.string,
});
