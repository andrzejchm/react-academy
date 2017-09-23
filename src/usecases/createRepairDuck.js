import moment from 'moment';
import PropTypes from 'prop-types';
import { getTodayUtcStart, localToUtcHour } from '../model/RepairListFilters';
import { doRequest, ENDPOINTS, GET, POST, STATUS_NONE } from '../redux/actions/rest_api';
import { DEFAULT_SORT_TYPE } from './repairsListDuck';
import { ApiResponseShape } from '../model/ApiResponse';
import getReducerForApiRequest,
{ initialState as apiInitialState } from './usecases/apiRequestReducer';
import { UserShape } from '../model/User';
import { getActionType } from '../utils';
import Repair from '../model/Repair';
import { LOCATION_CHANGE } from 'react-router-redux';
import config from '../config/config';

const PREFIX = 'CREATE_REPAIR';

const ACTION_DATE_CHANGED = `${PREFIX}/DATE_CHANGED`;
const ACTION_GET_REPAIRS = `${PREFIX}/GET_REPAIRS_LIST`;
const ACTION_GET_USERS = `${PREFIX}/GET_USERS`;
const ACTION_USER_SELECTED = `${PREFIX}/USER_SELECTED`;
const ACTION_TIME_SELECTED = `${PREFIX}/TIME_SELECTED`;
const ACTION_CREATE_REPAIR = `${PREFIX}/CREATE_REPAIR`;

const initialState = {
  date: getTodayUtcStart().format(),
  repairsTimes: apiInitialState,
  selectedUser: null,
  selectedTime: null,
  users: apiInitialState,
  userCreateStatus: STATUS_NONE,
};

function fetchRepairsListAction(state) {
  return doRequest(GET, ACTION_GET_REPAIRS, ENDPOINTS.repairsList(
    moment(state.date).startOf('day').valueOf(),
    moment(state.date).endOf('day').valueOf() + 2,
    DEFAULT_SORT_TYPE,
    '',
    true,
    true,
  ));
}

function getRepairsListReducerWrapper(state, action) {
  const newState = getReducerForApiRequest(ACTION_GET_REPAIRS)(state, action);
  if (newState.payload) {
    newState.payload = newState.payload.map(elem => (
      { startTime: elem.startDate, endTime: elem.endDate }),
    );
  }
  return newState;
}

function onLocationChangedReducer(state, action) {
  if (action.pathname !== config.routes.createRepair.path) {
    return initialState;
  }
  return state;
}

export default function reducer(state = initialState, action = {}) {
  switch (getActionType(action)) {
    case LOCATION_CHANGE:
      return onLocationChangedReducer(state, action);
    case ACTION_DATE_CHANGED:
      return { ...state, date: action.payload };
    case ACTION_USER_SELECTED:
      return { ...state, selectedUser: action.payload };
    case ACTION_TIME_SELECTED:
      return { ...state, selectedTime: parseInt(action.payload, 10) };
    case ACTION_GET_REPAIRS:
      return { ...state, repairsTimes: getRepairsListReducerWrapper(state.repairsTimes, action) };
    case ACTION_GET_USERS:
      return { ...state, users: getReducerForApiRequest(ACTION_GET_USERS)(state.users, action) };
    case ACTION_CREATE_REPAIR:
      return { ...state, userCreateStatus: action.status };
    default:
      return state;
  }
}

export function onTimeSelectedAction(hour) {
  return { type: ACTION_TIME_SELECTED, payload: hour };
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

function getStartDate(globalState) {
  return moment(globalState.createRepair.date)
    .add(localToUtcHour(globalState.createRepair.selectedTime), 'hours');
}

function getEndDate(globalState) {
  return getStartDate(globalState).add(1, 'hour');
}

function getUser(globalState) {
  return globalState.createRepair.selectedUser;
}

export function onApplyClickedAction() {
  return (dispatch, getState) =>
    doRequest(
      POST,
      ACTION_CREATE_REPAIR,
      ENDPOINTS.createRepair,
      new Repair(null, getStartDate(getState()), getEndDate(getState()),
        false, getUser(getState())).toApiPayload(),
    )(dispatch, getState);
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
  userCreateStatus: PropTypes.string,
});
