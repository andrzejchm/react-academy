import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import strings from '../config/strings';
import { CreateRepairPropType } from '../usecases/createRepairDuck';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  createRepairState: CreateRepairPropType.isRequired,
};

const defaultProps = {
};

class FiltersApplyButton extends Component {
  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
  }

  render() {
    const { createRepairState: repairState } = this.props;
    const isEverythingSelected =
      (repairState.selectedTime || repairState.selectedTime === 0) &&
      repairState.selectedUser &&
      repairState.date;

    return (
      <Button
        bsSize="large"
        style={{ marginLeft: '16px' }}
        bsStyle={isEverythingSelected ? 'primary' : 'default'}
        disabled={!isEverythingSelected}
        onClick={event => this.handleClick(event)}
        block
      >
        {strings.apply_button}
      </Button>
    );
  }
}

FiltersApplyButton.propTypes = propTypes;
FiltersApplyButton.defaultProps = defaultProps;
export default FiltersApplyButton;
