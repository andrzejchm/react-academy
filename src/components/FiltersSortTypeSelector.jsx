import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SortTypes } from '../model/Repair';

const propTypes = {
  sortType: PropTypes.string.isRequired,
  onSortTypeChanged: PropTypes.func.isRequired,
};

const defaultProps = {
};

export default class FiltersSortTypeSelector extends Component {
  render() {
    return (
      <Select
        clearable={false}
        searchable={false}
        value={this.props.sortType}
        options={SortTypes}
        onChange={val => this.props.onSortTypeChanged(val.value)}
      />);
  }
}

FiltersSortTypeSelector.propTypes = propTypes;

FiltersSortTypeSelector.defaultProps = defaultProps;
