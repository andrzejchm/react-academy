import { LOCATION_CHANGE } from 'react-router-redux';
import PropTypes from 'prop-types';
import {
  doRequest, ENDPOINTS, GET, STATUS_NONE,
} from '../redux/actions/rest_api';
import { repairFromApiResponse, RepairShape } from '../model/Repair';
import { ACTION_USER_LOGOUT } from '../usecases/authDuck';
import RepairListFilters, { RepairListFiltersShape } from '../model/RepairListFilters';
import { ApiResponseShapeInterior } from '../model/ApiResponse';
import config from '../config/config';


export const ACTION_REPAIRS_LIST_FILTERS_APPLIED = 'REPAIRS_LIST/FILTERS_APPLIED';
const ACTION_GET_REPAIRS_LIST = 'REPAIRS_LIST/GET_REPAIRS';
const ACTION_REPAIRS_LIST_SORT_TYPE_CHANGED = 'REPAIRS_LIST/SORT_TYPE_CHANGED';

const DEFAULT_SORT_TYPE = 'DATE_ASC';

export const initialState = {
  payload: null,
  status: STATUS_NONE,
  error: null,
  appliedFilters: { ...new RepairListFilters() },
  sortType: DEFAULT_SORT_TYPE,
};

function getRepairsListReducer(state, action) {
  let newPayload;
  if (action.payload) {
    newPayload = action.payload.map(elem => repairFromApiResponse(elem));
  } else {
    newPayload = action.payload;
  }
  const newState = { ...state };
  Object.assign(newState, action);
  newState.payload = newPayload;
  delete newState.type;
  delete newState.headers;
  return newState;
}

function fetchRepairsListAction(state) {
  return doRequest(GET, ACTION_GET_REPAIRS_LIST, ENDPOINTS.repairsList(
    state.appliedFilters.startDate.unix(),
    state.appliedFilters.endDate.unix() + 1,
    state.sortType,
    state.appliedFilters.assignedUser,
  ));
}

function filtersChangeReducer(state, action) {
  return { ...state, appliedFilters: action.payload };
}

function locationChangedReducer(state, action) {
  if (action.payload.pathname !== config.routes.repairs.path) {
    return initialState;
  }
  return state;
}

function sortTypeChangedReducer(state, action) {
  return { ...state, sortType: action.payload };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type.split('#')[0]) {
    case LOCATION_CHANGE:
      return locationChangedReducer(state, action);
    case ACTION_USER_LOGOUT:
      return initialState;
    case ACTION_GET_REPAIRS_LIST:
      return getRepairsListReducer(state, action);
    case ACTION_REPAIRS_LIST_FILTERS_APPLIED:
      return filtersChangeReducer(state, action);
    case ACTION_REPAIRS_LIST_SORT_TYPE_CHANGED:
      return sortTypeChangedReducer(state, action);
    default:
      return state;
  }
}

export function sortTypeChanged(sortType) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_REPAIRS_LIST_SORT_TYPE_CHANGED, payload: sortType });
    fetchRepairsListAction(getState().repairsList)(dispatch);
  };
}

export function filtersApplied(filters) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_REPAIRS_LIST_FILTERS_APPLIED, payload: filters });
    fetchRepairsListAction(getState().repairsList)(dispatch);
  };
}

export function triggerRepairsListFetch() {
  return (dispatch, getState) => {
    fetchRepairsListAction(getState().repairsList)(dispatch);
  };
}

export const RepairsListShape = PropTypes.shape({
  ...ApiResponseShapeInterior(PropTypes.arrayOf(RepairShape)),
  appliedFilters: RepairListFiltersShape,
});

