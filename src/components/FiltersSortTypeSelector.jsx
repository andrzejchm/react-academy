import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SortTypes } from '../model/Repair';

const propTypes = {
  sortType: PropTypes.string.isRequired,
  onSortTypeChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

export default function FiltersSortTypeSelector({ sortType, onSortTypeChanged }) {
  return (
    <Select
      clearable={false}
      searchable={false}
      value={sortType}
      options={SortTypes}
      onChange={val => onSortTypeChanged(val.value)}
    />);
}

FiltersSortTypeSelector.propTypes = propTypes;

FiltersSortTypeSelector.defaultProps = defaultProps;
