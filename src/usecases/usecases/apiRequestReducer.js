
import { STATUS_NONE } from '../../redux/actions/rest_api';
import { getActionType } from '../../utils';

function onApiRequestAction(state, action) {
  const newState = Object.assign({}, state, action);
  delete newState.type;
  return newState;
}

export const initialState = {
  status: STATUS_NONE,
  payload: null,
  error: null,
};

export default function reducer(actionType) {
  return (state = initialState, action) => {
    switch (getActionType(action)) {
      case actionType:
        return onApiRequestAction(state, action);
      default:
        return state;
    }
  };
}
