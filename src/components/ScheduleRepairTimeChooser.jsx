import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { RepairsTimesPropType } from '../usecases/createRepairDuck';
import { STATUS_LOADING, STATUS_NONE } from '../redux/actions/rest_api';
import Spinner from './Spinner';
import { ApiResponseShape } from '../model/ApiResponse';
import { localToUtcHour } from '../model/RepairListFilters';

const utcOffset = moment().utcOffset() / 60;

const propTypes = {
  onTimeSelected: PropTypes.func.isRequired,
  selectedTime: PropTypes.number,
  repairsTimes: ApiResponseShape(RepairsTimesPropType).isRequired,
};

const defaultProps = {
  selectedTime: null,
};

function getHour(timeString) {
  const hour = moment(timeString).hour();
  return hour - utcOffset;
}

function containsRepairAtHour(hour, repairsTimesArray) {
  const found = repairsTimesArray.find((element) => {
    const startHour = getHour(element.startTime);
    const endHour = getHour(element.endTime);
    return hour === startHour || (startHour <= hour && endHour > hour);
  });
  return found !== undefined;
}

function getHours(repairsTimesArray) {
  const booleans = [];
  for (let i = 0; i < 24; i += 1) {
    booleans.push({ hour: i, isTaken: containsRepairAtHour(localToUtcHour(i), repairsTimesArray) });
  }
  return booleans;
}

function shouldShowLoading(repairsTimes) {
  return repairsTimes.status === STATUS_LOADING || repairsTimes.status === STATUS_NONE;
}

export default function ScheduleRepairTimeChooser({ repairsTimes, onTimeSelected, selectedTime }) {
  if (shouldShowLoading(repairsTimes)) {
    return <Spinner name="line-scale" />;
  }

  function isSelected(elem) {
    return selectedTime === elem.hour;
  }

  function getColor(elem) {
    if (elem.isTaken) {
      return 'default';
    } else if (isSelected(elem)) {
      return 'success';
    }
    return 'default';
  }

  return (
    <div>
      {getHours(repairsTimes.payload).map(elem => (
        <Button
          key={elem.hour}
          bsStyle={getColor(elem)}
          active={isSelected(elem)}
          style={{ opacity: elem.isTaken ? 0.2 : 1.0 }}
          disabled={elem.isTaken}
          onClick={() => onTimeSelected(elem.hour)}
        >
          {elem.hour < 10 ? `0${elem.hour}:00` : `${elem.hour}:00`}
        </Button>
      ))}
    </div>
  );
}

ScheduleRepairTimeChooser.propTypes = propTypes;
ScheduleRepairTimeChooser.defaultProps = defaultProps;
