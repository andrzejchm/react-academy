import PropTypes from 'prop-types';
import { LOCATION_CHANGE } from 'react-router-redux';
import getReducerForApiRequest,
{ initialState as apiInitialState } from './usecases/apiRequestReducer';
import { getActionType } from '../utils';
import { RepairShape } from '../model/Repair';
import { ApiResponseShape } from '../model/ApiResponse';
import { DELETE, doRequest, ENDPOINTS, GET, STATUS_NONE } from '../redux/actions/rest_api';

const PREFIX = 'REPAIR_DETAILS';
const ACTION_LOAD_REPAIR_DETAILS = `${PREFIX}/GET_REPAIR_DETAILS`;
const ACTION_REMOVE_REPAIR = `${PREFIX}/REMOVE_REPAIR`;

export const initialState = {
  repair: apiInitialState,
  removeRepairStatus: STATUS_NONE,
};

function getReducerForApiRequestWrapper(state, action) {
  const repairDetails =
    getReducerForApiRequest(ACTION_LOAD_REPAIR_DETAILS)(state.repairsTimes, action);
  delete repairDetails.headers;
  return { ...state, repair: repairDetails };
}

export default function reducer(state = initialState, action) {
  switch (getActionType(action)) {
    case LOCATION_CHANGE:
      return initialState;
    case ACTION_LOAD_REPAIR_DETAILS:
      return getReducerForApiRequestWrapper(state, action);
    case ACTION_REMOVE_REPAIR:
      return { ...state, removeRepairStatus: action.status };
    default:
      return state;
  }
}

export function loadRepairDetailsAction(id) {
  return (dispatch, getState) => {
    doRequest(GET,
      ACTION_LOAD_REPAIR_DETAILS,
      ENDPOINTS.repairDetails(id),
    )(dispatch, getState);
  };
}

export function onRemoveClickedAction() {
  return (dispatch, getState) => {
    doRequest(DELETE,
      ACTION_REMOVE_REPAIR,
      ENDPOINTS.removeRepair(getState().repairDetails.repair.payload.id),
    )(dispatch, getState);
  };
}


export const RepairDetailsPropType = PropTypes.shape({
  repair: ApiResponseShape(RepairShape),
});
