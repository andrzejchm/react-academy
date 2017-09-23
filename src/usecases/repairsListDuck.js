import { LOCATION_CHANGE } from 'react-router-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  DELETE,
  doRequest, ENDPOINTS, GET, STATUS_NONE, STATUS_SUCCESS,
} from '../redux/actions/rest_api';
import { repairFromApiResponse, RepairShape } from '../model/Repair';
import { ACTION_USER_LOGOUT } from '../usecases/authDuck';
import RepairListFilters, { RepairListFiltersShape } from '../model/RepairListFilters';
import { ApiResponseShape } from '../model/ApiResponse';
import config from '../config/config';
import { getActionType } from '../utils';


export const ACTION_REPAIRS_LIST_FILTERS_APPLIED = 'REPAIRS_LIST/FILTERS_APPLIED';
const ACTION_GET_REPAIRS_LIST = 'REPAIRS_LIST/GET_REPAIRS';
const ACTION_REPAIRS_LIST_SORT_TYPE_CHANGED = 'REPAIRS_LIST/SORT_TYPE_CHANGED';
const ACTION_REMOVE_REPAIR = 'REPAIRS_LIST/REMOVE_REPAIR';

export const DEFAULT_SORT_TYPE = 'DATE_ASC';

export const initialState = {
  payload: null,
  status: STATUS_NONE,
  error: null,
  appliedFilters: { ...new RepairListFilters() },
  sortType: DEFAULT_SORT_TYPE,
  removeRepairStatus: STATUS_NONE,
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
    moment(state.appliedFilters.startDate)
      .add(state.appliedFilters.startTime, 'hours').valueOf(),
    moment(state.appliedFilters.endDate)
      .add(state.appliedFilters.endTime - 24, 'hours').valueOf() + 2,
    // end of day is 23:59:59:999 and we want to include dates that end with 24:00:00:000
    // so we add +2 since endDate is exclusive
    state.sortType,
    state.appliedFilters.assignedUser ? state.appliedFilters.assignedUser.username : '',
    state.appliedFilters.showCompleted,
    state.appliedFilters.showIncomplete,
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

function removeRepairReducer(state, action) {
  if (action.status === STATUS_SUCCESS) {
    return { ...state, removeRepairStatus: action.status };
  }
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
  ...ApiResponseShape(PropTypes.arrayOf(RepairShape)),
  appliedFilters: RepairListFiltersShape,
});
