import PropTypes from 'prop-types';
import { LOCATION_CHANGE } from 'react-router-redux';
import RepairListFilters, { RepairListFiltersShape } from '../model/RepairListFilters';
import { ACTION_USER_LOGOUT } from '../usecases/authDuck';
import { ACTION_REPAIRS_LIST_FILTERS_APPLIED } from './repairsListDuck';
import {
  doRequest, ENDPOINTS, GET } from '../redux/actions/rest_api';
import getReducerForApiRequest,
{ initialState as apiInitialState } from './usecases/apiRequestReducer';
import { ApiResponseShape } from '../model/ApiResponse';
import { UserShape } from '../model/User';

const PREFIX = 'REPAIRS_FILTERS_PANEL';

const ACTION_TOGGLE_FILTERS_VISIBILITY = `${PREFIX}/TOGGLE_VISIBILITY`;
const ACTION_VALUES_CHANGED = `${PREFIX}/VALUES_CHANGED`;
const ACTION_GET_USERS = `${PREFIX}/GET_USERS`;


export const initialState = {
  filters: { ...new RepairListFilters() },
  expanded: false,
  users: apiInitialState,
};

function toggleFiltersVisibilityReducer(state) {
  return { ...state, expanded: !state.expanded };
}

function locationChangedReducer(state) {
  // if (action.payload.pathname !== config.routes.repairs.path) {
  //   return initialState;
  // }
  return state;
}

function changeFiltersReducer(state, action) {
  return { ...state, filters: action.payload };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type.split('#')[0]) {
    case LOCATION_CHANGE:
      return locationChangedReducer(state, action);
    case ACTION_USER_LOGOUT:
      return initialState;
    case ACTION_REPAIRS_LIST_FILTERS_APPLIED:
      return changeFiltersReducer(toggleFiltersVisibilityReducer(state), action);
    case ACTION_VALUES_CHANGED:
      return changeFiltersReducer(state, action);
    case ACTION_TOGGLE_FILTERS_VISIBILITY:
      return toggleFiltersVisibilityReducer(state);
    case ACTION_GET_USERS:
      return { ...state, users: getReducerForApiRequest(ACTION_GET_USERS)(state.users, action) };
    default:
      return state;
  }
}

export function toggleFiltersVisibility() {
  return { type: ACTION_TOGGLE_FILTERS_VISIBILITY };
}

export function filterPanelValuesChanged(filterPanelValues) {
  return { type: ACTION_VALUES_CHANGED, payload: filterPanelValues };
}


export function getUsersByNameAction(name) {
  return (dispatch, getState) => {
    doRequest(GET, ACTION_GET_USERS, ENDPOINTS.usersByName(name))(dispatch, getState);
  };
}

export const FilterPanelShape = PropTypes.shape({
  expanded: PropTypes.bool,
  filters: RepairListFiltersShape,
  users: ApiResponseShape(PropTypes.arrayOf(UserShape)),
});
