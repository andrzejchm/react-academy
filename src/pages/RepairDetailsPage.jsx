import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';
import Button from 'react-bootstrap/es/Button';
import PropTypes from 'prop-types';
import { Col, Glyphicon, Grid, Image, Row } from 'react-bootstrap';
import { isAtLeastManager } from '../permissions';
import Spinner from '../components/Spinner';
import { UserInfoShape } from '../model/UserInfo';
import { RepairDetailsPropType } from '../usecases/repairDetailsDuck';
import { STATUS_NONE, STATUS_SUCCESS } from '../redux/actions/rest_api';
import strings from '../config/strings';
import config from '../config/config';
import CommentsBoxContainer from '../redux/containers/CommentsBoxContainer';

const propTypes = {
  loadRepairDetails: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  repairDetailsState: RepairDetailsPropType.isRequired,
  userInfo: UserInfoShape.isRequired,
};

const defaultProps = {};

function onEditClicked(id, history) {
  history.push(config.routes.editRepair(id).path);
}

export default function RepairDetailsPage({
  match, repairDetailsState, userInfo, loadRepairDetails, history, onRemoveClicked,
}) {
  if (repairDetailsState.removeRepairStatus === STATUS_SUCCESS) {
    return <Redirect to={config.routes.repairs.path} />;
  }
  if (repairDetailsState.repair.status === STATUS_NONE) {
    loadRepairDetails(match.params.id);
  }
  const repair = repairDetailsState.repair.payload;
  return repair ? (
    <Grid>
      <Row>
        <Col xs={12} md={8} mdpush={2}>
          <h3>Repair Details</h3>
        </Col>
        <Col xs={12} md={2} className="text-right">
          {isAtLeastManager(userInfo) && (
            <span>
              <Button
                bsStyle="primary"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  onEditClicked(match.params.id, history);
                }}
              >
                <Glyphicon glyph="edit" />
              </Button>
              <Button
                bsStyle="danger"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  onRemoveClicked();
                }}
              >
                <Glyphicon glyph="remove" />
              </Button>
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>
            {moment(repair.startDate).format('D MMM HH:mm')}
          &nbsp;-&nbsp;
            {moment(repair.endDate).format('HH:mm')}
            {repair.isCompleted
              ? <span style={{ lineHeight: '18px', color: 'green', marginLeft: 16 }}>
                {strings.completed}
                <Image
                  style={{ width: 14, height: 14, marginLeft: 8 }}
                  src="green_check"
                  circle
                />
              </span>
              : <span />}

          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h4>assigned to: {repair.assignedUser.username}</h4>
        </Col>
      </Row>
      <Row />
      <Row>
        <CommentsBoxContainer
          repairId={match.params.id}
          style={{ marginTop: 32 }}
        />
      </Row>
    </Grid>
  ) : (
    <Spinner
      name="line-scale"
    />);
}

RepairDetailsPage.propTypes = propTypes;
RepairDetailsPage.defaultProps = defaultProps;
