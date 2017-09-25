import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Checkbox, Col, ControlLabel, FormGroup, Grid, Row } from 'react-bootstrap';
import SingleDayPicker from '../components/SingleDayPicker';
import ScheduleRepairTimeChooser from '../components/ScheduleRepairTimeChooser';
import { CreateRepairPropType } from '../usecases/createRepairDuck';
import { STATUS_NONE, STATUS_SUCCESS } from '../redux/actions/rest_api';
import strings from '../config/strings';
import ChooseUserDropDown from '../components/ChooseUserDropDown';
import RepairApplyButton from '../components/RepairApplyButton';
import config from '../config/config';

const propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  onApplyClicked: PropTypes.func.isRequired,
  onTimeSelected: PropTypes.func.isRequired,
  onIsCompletedClicked: PropTypes.func.isRequired,
  onDateChanged: PropTypes.func.isRequired,
  onUserSelected: PropTypes.func.isRequired,
  onEditModeEntered: PropTypes.func.isRequired,
  getUsersByName: PropTypes.func.isRequired,
  createRepairState: CreateRepairPropType.isRequired,
};

const defaultProps = {};

function loadRepairsTimesIfNeccessary(createRepairState, onDateChanged) {
  if (createRepairState.repairsTimes.status === STATUS_NONE) {
    onDateChanged(createRepairState.date);
  }
}

function setRepairIdIfEditing(createRepairState, match, onEditModeEntered) {
  if (!createRepairState.isEditMode) {
    const id = match.params ? match.params.id : null;
    if (id && config.routes.editRepair(id).path === match.url) {
      onEditModeEntered(id);
      return true;
    }
  }
  return false;
}

export default function CreateRepairPage({
  createRepairState, onDateChanged, onUserSelected, getUsersByName, onTimeSelected, onApplyClicked,
  match, onEditModeEntered, onIsCompletedClicked,
}) {
  const enteredEditMode = setRepairIdIfEditing(createRepairState, match, onEditModeEntered);
  if (!enteredEditMode) {
    loadRepairsTimesIfNeccessary(createRepairState, onDateChanged);
  }
  const isEdit = createRepairState.isEditMode;

  if (createRepairState.repairCreateStatus === STATUS_SUCCESS) {
    return <Redirect to={config.routes.repairs.path} />;
  }
  return (
    <div>
      <h3>{isEdit
        ? strings.edit_repair
        : strings.create_repair}</h3>
      <Grid>
        <Row>
          <Col xs={12} sm={3} smOffset={2}>
            <FormGroup>
              <ControlLabel>{strings.filter_label_choose_day}</ControlLabel>
              <div>
                <SingleDayPicker
                  date={moment(createRepairState.date)}
                  onDayChanged={date => onDateChanged(date)}
                />
              </div>
            </FormGroup>
          </Col>
          <Col xs={6} sm={3}>
            <FormGroup>
              <ControlLabel>{strings.assign_user}</ControlLabel>
              <ChooseUserDropDown
                getUsersByName={getUsersByName}
                users={createRepairState.users}
                selectedUser={createRepairState.selectedUser}
                onUserSelected={user => onUserSelected(user)}
              />
            </FormGroup>
          </Col>
          <Col xs={6} sm={3}>
            <FormGroup>
              <ControlLabel />
              <Checkbox
                checked={createRepairState.isCompleted}
                onClick={() => onIsCompletedClicked()}
              >
                Is completed
              </Checkbox>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={6} smOffset={2}>
            <ControlLabel>{strings.choose_time}</ControlLabel>
            <ScheduleRepairTimeChooser
              selectedTime={createRepairState.selectedTime}
              repairsTimes={createRepairState.repairsTimes}
              onTimeSelected={hour => onTimeSelected(hour)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={10} smPush={2} sm={6} style={{ marginTop: 32, marginLeft: 0, padding: 0 }}>
            <RepairApplyButton
              createRepairState={createRepairState}
              onClick={onApplyClicked}
            />
          </Col>
        </Row>
      </Grid>
    </div>);
}

CreateRepairPage.propTypes = propTypes;
CreateRepairPage.defaultProps = defaultProps;
