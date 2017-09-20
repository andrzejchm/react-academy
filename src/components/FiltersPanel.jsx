import React from 'react';
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { RepairListFiltersShape } from '../model/RepairListFilters';

export default function FiltersPanel({ filters, expanded }) {
  return (<Panel collapsible expanded={expanded}>
    {JSON.stringify(filters)}
  </Panel>);
}

FiltersPanel.propTypes = {
  filters: RepairListFiltersShape.isRequired,
  expanded: PropTypes.bool.isRequired,
};
