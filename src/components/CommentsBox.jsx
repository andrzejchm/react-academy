import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormControl, Grid, Row } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import strings from '../config/strings';
import CommentsList from './CommentsList';
import { CommentsPropType } from '../usecases/commentsDuck';
import { STATUS_LOADING, STATUS_NONE } from '../redux/actions/rest_api';

const propTypes = {
  getComments: PropTypes.func.isRequired,
  onTypedInCommentChanged: PropTypes.func.isRequired,
  onCommentButtonClicked: PropTypes.func.isRequired,
  commentsState: CommentsPropType.isRequired,
};

const defaultProps = {
};

function CommentsBox({
  commentsState, onTypedInCommentChanged, onCommentButtonClicked, getComments,
}) {
  if (commentsState.comments.status === STATUS_NONE) {
    getComments();
  }
  return (
    <Grid>
      <Row>
        <Col xs={10}>
          <hr />
          <h3>{strings.comments}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={10}>
          <CommentsList list={commentsState.comments.payload} />
        </Col>
      </Row>
      <Row style={{ marginBottom: 32 }}>
        <Col xs={6} md={8}>
          <FormControl
            type="text"
            value={commentsState.typedInComment}
            placeholder={strings.comment_here_hint}
            onChange={event => onTypedInCommentChanged(event.target.value)}
          />
        </Col>
        <Col xs={4} md={2}>
          <Button
            bsStyle="primary"
            onClick={() => onCommentButtonClicked()}
            disabled={commentsState.postCommentStatus === STATUS_LOADING}
            block
          >{strings.comment}</Button>
        </Col>
      </Row>
    </Grid>);
}

CommentsBox.propTypes = propTypes;
CommentsBox.defaultProps = defaultProps;
export default CommentsBox;
