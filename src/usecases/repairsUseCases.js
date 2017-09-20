import { LOCATION_CHANGE } from 'react-router-redux';
import PropTypes from 'prop-types';
import {
  doRequest, ENDPOINTS, GET, STATUS_NONE,
} from '../redux/actions/rest_api';
import { repairFromApiResponse, RepairShape } from '../model/Repair';
import { USER_LOGOUT } from '../redux/actions/userInfoActions';
import RepairListFilters, { RepairListFiltersShape } from '../model/RepairListFilters';
import { ApiResponseShapeInterior } from '../model/ApiResponse';
import config from '../config/config';

const ACTION_GET_REPAIRS_LIST = 'GET_REPAIRS_LIST';
const ACTION_REPAIRS_CHANGE_FILTERS = 'REPAIRS_CHANGE_FILTERS';
const ACTION_TOGGLE_REPAIRS_LIST_FILTERS_VISIBILITY = 'TOGGLE_REPAIRS_LIST_FILTERS_VISIBILITY';


export const initialState = {
  payload: null,
  status: STATUS_NONE,
  error: null,
  filters: { ...new RepairListFilters() },
  filtersPanelExpanded: false,
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

function filtersChangeReducer(state, action) {
  return { ...state, filters: action.payload };
}

function toggleFiltersVisibilityReducer(state) {
  return { ...state, filtersPanelExpanded: !state.filtersPanelExpanded };
}

function locationChangedReducer(state, action) {
  if (action.payload.pathname !== config.routes.repairs.path) {
    return initialState;
  }
  return state;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return locationChangedReducer(state, action);
    case USER_LOGOUT:
      return initialState;
    case ACTION_GET_REPAIRS_LIST:
      return getRepairsListReducer(state, action);
    case ACTION_REPAIRS_CHANGE_FILTERS:
      return filtersChangeReducer(state, action);
    case ACTION_TOGGLE_REPAIRS_LIST_FILTERS_VISIBILITY:
      return toggleFiltersVisibilityReducer(state);
    default:
      return state;
  }
}

export function getRepairsListWithFilters(filters) {
  return (dispatch) => {
    dispatch({ type: ACTION_REPAIRS_CHANGE_FILTERS, payload: filters });
    doRequest(GET, ACTION_GET_REPAIRS_LIST, ENDPOINTS.repairsList(
      filters.startDate.unix(),
      filters.endDate.unix(),
      filters.sortType,
    ))(dispatch);
  };
}

export function toggleFiltersVisibility() {
  return {
    type: ACTION_TOGGLE_REPAIRS_LIST_FILTERS_VISIBILITY,
  };
}
export const RepairsListShape = PropTypes.shape({
  ...ApiResponseShapeInterior(PropTypes.arrayOf(RepairShape)),
  filtersPanelExpanded: PropTypes.bool,
  filters: RepairListFiltersShape,
});

