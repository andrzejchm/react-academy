import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import { RepairListFiltersShape } from '../model/RepairListFilters';
import strings from '../config/strings';

const propTypes = {
  filterPanelValues: RepairListFiltersShape.isRequired,
  appliedFilters: RepairListFiltersShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
};

class FiltersApplyButton extends Component {
  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
  }

  render() {
    const { appliedFilters, filterPanelValues } = this.props;
    const isAnythingChanged = JSON.stringify(appliedFilters) !== JSON.stringify(filterPanelValues);

    return (
      <Button
        style={{ marginLeft: '16px' }}
        bsStyle={isAnythingChanged ? 'primary' : 'default'}
        disabled={!isAnythingChanged}
        onClick={event => this.handleClick(event)}
      >
        {strings.apply_button}
      </Button>
    );
  }
}

FiltersApplyButton.propTypes = propTypes;
FiltersApplyButton.defaultProps = defaultProps;
export default FiltersApplyButton;
