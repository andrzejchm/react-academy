import moment from 'moment';
import { LOCATION_CHANGE } from 'react-router-redux';
import PropTypes from 'prop-types';
import {
  getTodayUtcStart, toLocalEndOfDayInUtc, toLocalStartOfDayInUtc,
} from '../model/RepairListFilters';
import {
  doRequest, ENDPOINTS, GET, POST, STATUS_NONE,
  STATUS_SUCCESS,
} from '../redux/actions/rest_api';
import { DEFAULT_SORT_TYPE } from './repairsListDuck';
import { ApiResponseShape } from '../model/ApiResponse';
import getReducerForApiRequest,
{ initialState as apiInitialState } from './usecases/apiRequestReducer';
import { UserShape } from '../model/User';
import { getActionType } from '../utils';
import Repair from '../model/Repair';
import config from '../config/config';

const PREFIX = 'CREATE_REPAIR';

const ACTION_DATE_CHANGED = `${PREFIX}/DATE_CHANGED`;
const ACTION_GET_REPAIRS = `${PREFIX}/GET_REPAIRS_LIST`;
const ACTION_GET_USERS = `${PREFIX}/GET_USERS`;
const ACTION_USER_SELECTED = `${PREFIX}/USER_SELECTED`;
const ACTION_TIME_SELECTED = `${PREFIX}/TIME_SELECTED`;
const ACTION_CREATE_REPAIR = `${PREFIX}/CREATE_REPAIR`;
const ACTION_EDIT_MODE_ENTERED = `${PREFIX}/EDIT_MODE_ENTERED`;
const ACTION_GET_REPAIR_DETAILS = `${PREFIX}/GET_REPAIR_DETAILS`;
const ACTION_IS_COMPLETED_CLICKED = `${PREFIX}/IS_COMPLETED_CLICKED`;

const initialState = {
  date: getTodayUtcStart().format(),
  repairsTimes: apiInitialState,
  selectedUser: null,
  selectedTime: null, // number of hours from midnight in local time
  users: apiInitialState,
  repairCreateStatus: STATUS_NONE,
  isEditMode: false,
  isCompleted: false,
  repairId: null,
};

// //////////////////////////////////////////////
// //////////////////////////////////////////////
// ////// HELPERS
// //////////////////////////////////////////////
// //////////////////////////////////////////////
function getStartDate(globalState) {
  const hour = globalState.createRepair.selectedTime;
  const date = moment(globalState.createRepair.date).add(hour, 'hours');
  return date;
}

function getEndDate(globalState) {
  return getStartDate(globalState).add(1, 'hours');
}

function getUser(globalState) {
  return globalState.createRepair.selectedUser;
}

function getRepairId(globalState) {
  return globalState.createRepair.repairId;
}

function getIsCompleted(globalState) {
  return globalState.createRepair.isCompleted;
}

function getRepairsListReducerWrapper(state, action) {
  const repairsTimes = getReducerForApiRequest(ACTION_GET_REPAIRS)(state.repairsTimes, action);
  if (repairsTimes.payload) {
    repairsTimes.payload = repairsTimes.payload
      .map(elem => ({ id: elem.id, startTime: elem.startDate, endTime: elem.endDate }))
      .filter(elem => elem.id !== state.repairId);
  }
  return { ...state, repairsTimes };
}

function onLocationChangedReducer(state, action) {
  if (action.pathname !== config.routes.createRepair.path) {
    return initialState;
  }
  return state;
}

function onGetRepairDetailsReducer(state, action) {
  if (action.status === STATUS_SUCCESS) {
    let date = moment(action.payload.startDate).local();
    const selectedTime = date.hours();
    date = toLocalStartOfDayInUtc(date);
    const newState = {
      ...state,
      date: date.format(),
      selectedUser: action.payload.assignedUser,
      isCompleted: action.payload.isCompleted,
      selectedTime,
    };
    if (newState.repairsTimes.payload) {
      newState.repairsTimes.payload =
        newState.repairsTimes.payload.filter(elem => elem.id !== action.payload.id);
    }
    return newState;
  }
  return state;
}

export default function reducer(state = initialState, action = {}) {
  switch (getActionType(action)) {
    case LOCATION_CHANGE:
      return onLocationChangedReducer(state, action);
    case ACTION_DATE_CHANGED:
      return { ...state, date: toLocalStartOfDayInUtc(action.payload) };
    case ACTION_USER_SELECTED:
      return { ...state, selectedUser: action.payload };
    case ACTION_TIME_SELECTED:
      return { ...state, selectedTime: parseInt(action.payload, 10) };
    case ACTION_GET_REPAIRS:
      return getRepairsListReducerWrapper(state, action);
    case ACTION_GET_USERS:
      return { ...state, users: getReducerForApiRequest(ACTION_GET_USERS)(state.users, action) };
    case ACTION_CREATE_REPAIR:
      return { ...state, repairCreateStatus: action.status };
    case ACTION_EDIT_MODE_ENTERED:
      return { ...state, isEditMode: true, repairId: action.payload };
    case ACTION_GET_REPAIR_DETAILS:
      return onGetRepairDetailsReducer(state, action);
    case ACTION_IS_COMPLETED_CLICKED:
      return { ...state, isCompleted: !state.isCompleted };
    default:
      return state;
  }
}

// //////////////////////////////////////////////
// //////////////////////////////////////////////
// ////// ACTIONS
// //////////////////////////////////////////////
// //////////////////////////////////////////////

function fetchRepairsListAction(state) {
  const start = toLocalStartOfDayInUtc(state.date);
  const end = toLocalEndOfDayInUtc(state.date);
  return doRequest(GET, ACTION_GET_REPAIRS, ENDPOINTS.repairsList(
    start.valueOf(),
    end.valueOf() + 1,
    DEFAULT_SORT_TYPE,
    '',
    true,
    true,
  ));
}

export function onTimeSelectedAction(hour) {
  return { type: ACTION_TIME_SELECTED, payload: hour };
}

export function onEditModeEnteredAction(id) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_EDIT_MODE_ENTERED, payload: +id });
    doRequest(GET, ACTION_GET_REPAIR_DETAILS, ENDPOINTS.repairDetails(id), null, () => {
      fetchRepairsListAction(getState().createRepair)(dispatch, getState);
    })(dispatch, getState);
  };
}
export function onUserSelectedAction(user) {
  return { type: ACTION_USER_SELECTED, payload: user };
}

export function getUsersByNameAction(name) {
  return (dispatch, getState) => {
    dispatch(onUserSelectedAction(null));
    doRequest(GET, ACTION_GET_USERS, ENDPOINTS.usersByName(name))(dispatch, getState);
  };
}

export function onApplyClickedAction() {
  return (dispatch, getState) => {
    const endpoint = getState().createRepair.isEditMode
      ? ENDPOINTS.editRepair(getState().createRepair.repairId)
      : ENDPOINTS.createRepair;
    doRequest(
      POST,
      ACTION_CREATE_REPAIR,
      endpoint,
      new Repair(getRepairId(getState()), getStartDate(getState()), getEndDate(getState()),
        getIsCompleted(getState()), getUser(getState())).toApiPayload(),
    )(dispatch, getState);
  };
}

export function onIsCompletedClickedAction() {
  return { type: ACTION_IS_COMPLETED_CLICKED };
}

export function onDateChangedAction(date) {
  return (dispatch, getState) => {
    dispatch(onTimeSelectedAction(null));
    dispatch({ type: ACTION_DATE_CHANGED, payload: date });
    fetchRepairsListAction(getState().createRepair)(dispatch, getState);
  };
}

export const RepairsTimesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }));


export const CreateRepairPropType = PropTypes.shape({
  date: PropTypes.string,
  repairsTimes: ApiResponseShape(RepairsTimesPropType),
  users: ApiResponseShape(PropTypes.arrayOf(UserShape)),
  selectedUser: UserShape,
  selectedTime: PropTypes.number,
  repairCreateStatus: PropTypes.string,
  isEditMode: PropTypes.bool,
  repairId: PropTypes.number,
});
