import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ControlLabel } from 'react-bootstrap';
import strings from '../config/strings';

const propTypes = {
  showCompleted: PropTypes.bool.isRequired,
  showIncomplete: PropTypes.bool.isRequired,
  onCompletedStateSelected: PropTypes.func.isRequired,
};

const VAL_SHOW_ALL = 'showAll';
const VAL_COMPLETE_ONLY = 'completedOnly';
const VAL_INCOMPLETE_ONLY = 'incompleteOnly';

const options = [
  { value: VAL_SHOW_ALL, label: strings.filter_completed_show_all },
  { value: VAL_COMPLETE_ONLY, label: strings.filter_completed_only },
  { value: VAL_INCOMPLETE_ONLY, label: strings.filter_incomplete_only },
];
export default function FiltersTimePicker({
  showCompleted,
  showIncomplete,
  onCompletedStateSelected,
}) {
  function onOptionChanged(value) {
    switch (value) {
      case VAL_SHOW_ALL:
        onCompletedStateSelected(true, true);
        break;
      case VAL_COMPLETE_ONLY:
        onCompletedStateSelected(true, false);
        break;
      case VAL_INCOMPLETE_ONLY:
        onCompletedStateSelected(false, true);
        break;
      default:
        break;
    }
  }

  function selectedValue() {
    if (showCompleted && showIncomplete) {
      return VAL_SHOW_ALL;
    } else if (showCompleted && !showIncomplete) {
      return VAL_COMPLETE_ONLY;
    } else if (!showCompleted && showIncomplete) {
      return VAL_INCOMPLETE_ONLY;
    }
  }

  return (
    <span>
      <ControlLabel
        style={{ marginLeft: '16px' }}
      >{strings.filter_label_choose_status}</ControlLabel>&nbsp;
      <span style={{ display: 'inline-block', verticalAlign: 'middle', width: '150px' }}>
        <Select
          autosize={false}
          clearable={false}
          searchable={false}
          value={selectedValue()}
          options={options}
          onChange={val => onOptionChanged(val.value)}
        />
      </span>
    </span>
  );
}

FiltersTimePicker.propTypes = propTypes;
