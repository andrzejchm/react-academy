import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel, FormGroup, Grid, Row } from 'react-bootstrap';
import DayPicker from '../components/SingleDayPicker';
import ScheduleRepairTimeChooser from '../components/ScheduleRepairTimeChooser';
import { CreateRepairPropType } from '../usecases/createRepairDuck';
import { STATUS_NONE } from '../redux/actions/rest_api';
import strings from '../config/strings';
import ChooseUserDropDown from '../components/ChooseUserDropDown';

const propTypes = {
  onTimeSelected: PropTypes.func.isRequired,
  onDateChanged: PropTypes.func.isRequired,
  onUserSelected: PropTypes.func.isRequired,
  getUsersByName: PropTypes.func.isRequired,
  createRepairState: CreateRepairPropType.isRequired,
};

const defaultProps = {

};

function loadRepairsTimesIfNeccessary(repairsTimes, onDateChanged) {
  if (repairsTimes.status === STATUS_NONE) {
    onDateChanged(repairsTimes.date);
  }
}

export default function CreateRepairPage({
  createRepairState, onDateChanged, onUserSelected, getUsersByName, onTimeSelected,
}) {
  loadRepairsTimesIfNeccessary(createRepairState.repairsTimes, onDateChanged);
  return (
    <div>
      <h3>{strings.create_repair}</h3>
      <Grid>
        <Row>
          <Col xs={12} md={2} mdOffset={2}>
            <FormGroup>
              <ControlLabel>{strings.filter_label_choose_day}</ControlLabel>
              <div>
                <DayPicker onDayChanged={date => onDateChanged(date.format())} />
              </div>
            </FormGroup>
          </Col>
          <Col xs={12} md={2}>
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
        </Row>
        <Row>
          <Col xs={10} md={6} mdOffset={2}>
            <ScheduleRepairTimeChooser
              selectedTime={createRepairState.selectedTime}
              repairsTimes={createRepairState.repairsTimes}
              onTimeSelected={hour => onTimeSelected(hour)}
            />
          </Col>
        </Row>
      </Grid>
    </div>);
}

CreateRepairPage.propTypes = propTypes;
CreateRepairPage.defaultProps = defaultProps;