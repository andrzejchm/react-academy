import PropTypes from 'prop-types';
import { LOCATION_CHANGE } from 'react-router-redux';
import getReducerForApiRequest,
{ initialState as apiInitialState } from './usecases/apiRequestReducer';
import { getActionType } from '../utils';
import { ApiResponseShape } from '../model/ApiResponse';
import { doRequest, ENDPOINTS, GET, POST } from '../redux/actions/rest_api';
import { CommentItemPropType, postCommentBody } from '../model/CommentItem';

const PREFIX = 'COMMENTS';
const ACTION_COMMENT_CHANGED = `${PREFIX}/COMMENT_CHANGED`;
const ACTION_POST_COMMENT = `${PREFIX}/POST_COMMENT`;
const ACTION_GET_COMMENTS = `${PREFIX}/GET_COMMENTS`;

export const initialState = {
  comments: apiInitialState,
  typedInComment: '',
};

function getReducerForApiRequestWrapper(state, action) {
  const comments = getReducerForApiRequest(ACTION_GET_COMMENTS)(state.comments, action);
  return { ...state, comments };
}

export default function reducer(state = initialState, action) {
  switch (getActionType(action)) {
    case LOCATION_CHANGE:
      return initialState;
    case ACTION_COMMENT_CHANGED:
      return { ...state, typedInComment: action.payload };
    case ACTION_POST_COMMENT:
      return { ...state, postCommentStatus: action.status };
    case ACTION_GET_COMMENTS:
      return getReducerForApiRequestWrapper(state, action);
    default:
      return state;
  }
}

export function onTypedInCommentChangedAction(comment) {
  return { type: ACTION_COMMENT_CHANGED, payload: comment };
}

export function getCommentsAction(id) {
  return (dispatch, getState) => {
    doRequest(
      GET,
      ACTION_GET_COMMENTS,
      ENDPOINTS.getComments(id),
    )(dispatch, getState);
  };
}

export function onCommentButtonClickedAction(id) {
  return (dispatch, getState) => {
    doRequest(
      POST,
      ACTION_POST_COMMENT,
      ENDPOINTS.postComment(id),
      postCommentBody(getState().comments.typedInComment),
      () => {
        getCommentsAction(id)(dispatch, getState);
      },
    )(dispatch, getState);
  };
}

export const CommentsPropType = PropTypes.shape({
  comments: ApiResponseShape(PropTypes.arrayOf(CommentItemPropType)),
  typedInComment: PropTypes.string,
});
