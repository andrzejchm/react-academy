import { LOCATION_CHANGE } from 'react-router-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  DELETE,
  doRequest, ENDPOINTS, GET, STATUS_NONE } from '../redux/actions/rest_api';
import apiRequestReducer, { initialState as apiInitialState } from './usecases/apiRequestReducer';
import { repairFromApiResponse, RepairShape } from '../model/Repair';
import { ACTION_USER_LOGOUT } from '../usecases/authDuck';
import RepairListFilters, { RepairListFiltersShape } from '../model/RepairListFilters';
import { ApiResponseShape } from '../model/ApiResponse';
import { getActionType } from '../utils';


export const ACTION_REPAIRS_LIST_FILTERS_APPLIED = 'REPAIRS_LIST/FILTERS_APPLIED';
const ACTION_GET_REPAIRS_LIST = 'REPAIRS_LIST/GET_REPAIRS';
const ACTION_REPAIRS_LIST_SORT_TYPE_CHANGED = 'REPAIRS_LIST/SORT_TYPE_CHANGED';
const ACTION_REMOVE_REPAIR = 'REPAIRS_LIST/REMOVE_REPAIR';

export const DEFAULT_SORT_TYPE = 'DATE_ASC';

export const initialState = {
  repairs: apiInitialState,
  appliedFilters: { ...new RepairListFilters() },
  sortType: DEFAULT_SORT_TYPE,
  removeRepairStatus: STATUS_NONE,
};

function getRepairsListReducer(state, action) {
  const newRepairs = apiRequestReducer(ACTION_GET_REPAIRS_LIST)(state.repairs, action);
  let newPayload;
  if (action.payload) {
    newPayload = action.payload.map(elem => repairFromApiResponse(elem));
  } else {
    newPayload = action.payload;
  }
  Object.assign(newRepairs, action);
  newRepairs.payload = newPayload;
  delete newRepairs.type;
  delete newRepairs.headers;
  return { ...state, repairs: newRepairs };
}

function fetchRepairsListAction(state) {
  return doRequest(GET, ACTION_GET_REPAIRS_LIST, ENDPOINTS.repairsList(
    moment(state.appliedFilters.date)
      .add(state.appliedFilters.startTime, 'hours').valueOf() + 1,
    moment(state.appliedFilters.date)
      .add(state.appliedFilters.endTime, 'hours').valueOf(),
    state.sortType,
    state.appliedFilters.assignedUser ? state.appliedFilters.assignedUser.username : '',
    state.appliedFilters.showCompleted,
    state.appliedFilters.showIncomplete,
  ));
}

function filtersChangeReducer(state, action) {
  return { ...state, appliedFilters: action.payload };
}

function locationChangedReducer(state) {
  return state;
}

function sortTypeChangedReducer(state, action) {
  return { ...state, sortType: action.payload };
}

function removeRepairReducer(state, action) {
  return { ...state, removeRepairStatus: action.status };
}

export default function reducer(state = initialState, action = {}) {
  switch (getActionType(action)) {
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
    case ACTION_REMOVE_REPAIR:
      return removeRepairReducer(state, action);
    default:
      return state;
  }
}

export function sortTypeChanged(sortType) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_REPAIRS_LIST_SORT_TYPE_CHANGED, payload: sortType });
    fetchRepairsListAction(getState().repairsList)(dispatch, getState);
  };
}

export function removeRepairAction(repair) {
  return (dispatch, getState) => {
    doRequest(DELETE, ACTION_REMOVE_REPAIR, ENDPOINTS.removeRepair(repair.id), null, () => {
      fetchRepairsListAction(getState().repairsList)(dispatch, getState);
    })(dispatch, getState);
  };
}

export function filtersApplied(filters) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_REPAIRS_LIST_FILTERS_APPLIED, payload: filters });
    fetchRepairsListAction(getState().repairsList)(dispatch, getState);
  };
}

export function triggerRepairsListFetch() {
  return (dispatch, getState) => {
    fetchRepairsListAction(getState().repairsList)(dispatch, getState);
  };
}

export const RepairsListShape = PropTypes.shape({
  repairs: ApiResponseShape(PropTypes.arrayOf(RepairShape)),
  appliedFilters: RepairListFiltersShape,
});
