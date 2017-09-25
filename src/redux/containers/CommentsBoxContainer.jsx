import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentsBox from '../../components/CommentsBox';
import {
  getCommentsAction,
  onCommentButtonClickedAction,
  onTypedInCommentChangedAction,
} from '../../usecases/commentsDuck';

const mapStateToProps = state => ({
  commentsState: state.comments,
});

const mapDispatchToProps = dispatch => ({
  onTypedInCommentChanged: comment => dispatch(onTypedInCommentChangedAction(comment)),
  onCommentButtonClicked: id => dispatch(onCommentButtonClickedAction(id)),
  getComments: id => dispatch(getCommentsAction(id)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, dispatchProps, stateProps, {
    onCommentButtonClicked: () =>
      dispatchProps.onCommentButtonClicked(ownProps.repairId),
    getComments: () =>
      dispatchProps.getComments(ownProps.repairId),
  });

const CommentsBoxContainer =
  withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(CommentsBox));
export default CommentsBoxContainer;
