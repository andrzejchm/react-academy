import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';
import { CommentItemPropType } from '../model/CommentItem';
import strings from '../config/strings';
import moment from 'moment';

const propTypes = {
  list: PropTypes.arrayOf(CommentItemPropType),
};

const defaultProps = {
  list: [],
};

function CommentsList({ list }) {
  return list && list.length ?
    (<div>
      {list.map(item => (
        <Panel>
          <Row style={{ color: '#999' }}>
            <Col xs={6}>
              <small>{strings.user_wrote_format(item.user.username)}</small>
            </Col>
            <Col xs={6} className="text-right">
              <small>{moment(item.date).fromNow()}</small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ marginTop: 16, marginLeft: 16 }}>
              <p>{item.contents}</p>
            </Col>
          </Row>
        </Panel>
      ))}
    </div>
    )
    : (<Panel><div className="text-center">{strings.no_comments_yet}</div></Panel>);
}

CommentsList.propTypes = propTypes;
CommentsList.defaultProps = defaultProps;
export default CommentsList;
