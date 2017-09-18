import moment from 'moment';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  doRequest, ENDPOINTS, GET, STATUS_NONE,
} from '../redux/actions/rest_api';
import Repair from '../model/Repair';
import { USER_LOGOUT } from '../redux/actions/userInfoActions';

const GET_REPAIRS_LIST = 'get repairs list';

export const initialState = {
  payload: null,
  status: STATUS_NONE,
  error: null,
};

function getRepairsListReducer(state, action) {
  let newPayload;
  if (action.payload) {
    newPayload = action.payload.map(elem => new Repair(elem.id, elem.name, moment(elem.dateTime)));
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

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOCATION_CHANGE:
    case USER_LOGOUT:
      return initialState;
    case GET_REPAIRS_LIST:
      return getRepairsListReducer(state, action);
    default:
      return state;
  }
}

export function getRepairsListForToday() {
  return doRequest(GET, GET_REPAIRS_LIST, ENDPOINTS.repairsList(
    moment().startOf('day').unix(),
    moment().endOf('day').add(1, 'ms').unix()));
}
