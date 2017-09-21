import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ControlLabel } from 'react-bootstrap';
import strings from '../config/strings';

const propTypes = {
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  onStartTimeChanged: PropTypes.func.isRequired,
  onEndTimeChanged: PropTypes.func.isRequired,
};

function getOptions(lowerLimit = 0, upperLimit = 24) {
  const options = [];
  for (let i = lowerLimit; i < upperLimit + 1; i += 1) {
    if (i > 9) {
      options.push({ value: i, label: `${i}:00` });
    } else {
      options.push({ value: i, label: `0${i}:00` });
    }
  }
  return options;
}

export default function FiltersTimePicker({
  startTime,
  endTime,
  onStartTimeChanged,
  onEndTimeChanged,
}) {
  return (
    <span>
      <ControlLabel
        style={{ marginLeft: '16px' }}
      >{strings.filter_label_choose_time}</ControlLabel>&nbsp;
      <span style={{ display: 'inline-block', verticalAlign: 'middle', width: '75px' }}>
        <Select
          autosize={false}
          clearable={false}
          searchable={false}
          value={startTime}
          options={getOptions(0, endTime - 1)}
          onChange={val => onStartTimeChanged(val.value)}
        />
      </span>
      &nbsp;to&nbsp;
      <span style={{ display: 'inline-block', verticalAlign: 'middle', width: '75px' }}>
        <Select
          autosize={false}
          clearable={false}
          searchable={false}
          value={endTime}
          options={getOptions(startTime + 1, 24)}
          onChange={val => onEndTimeChanged(val.value)}
        />
      </span>
      &nbsp;
    </span>
  );
}

FiltersTimePicker.propTypes = propTypes;
