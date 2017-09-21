import React from 'react';
import { Form, FormGroup, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'react-dates/lib/css/_datepicker.css';
import { RepairListFiltersShape } from '../model/RepairListFilters';
import FiltersDatePicker from './FiltersDatePicker';
import UsernameChooser from './UsernameChooser';
import FiltersApplyButton from './FiltersApplyButton';
import FiltersTimePicker from './FiltersTimePicker';
import FiltersCompletedStatePicker from './FiltersCompletedStatePicker';

const propTypes = {
  filterPanelValues: RepairListFiltersShape.isRequired,
  appliedFilters: RepairListFiltersShape.isRequired,
  expanded: PropTypes.bool.isRequired,
  onFilterPanelValuesChanged: PropTypes.func.isRequired,
  onFiltersApplied: PropTypes.func.isRequired,
};

const defaultProps = {
  inputType: null,
};

export default function FiltersPanel({
  appliedFilters,
  filterPanelValues,
  expanded,
  onFilterPanelValuesChanged,
  onFiltersApplied,
}) {
  return (<Panel collapsible expanded={expanded}>
    <Form inline>
      <FormGroup>
        <FiltersDatePicker
          startDate={filterPanelValues.startDate}
          endDate={filterPanelValues.endDate}
          onDateChanged={(startDate, endDate) =>
            onFilterPanelValuesChanged({ ...filterPanelValues, startDate, endDate })}
        />
      </FormGroup>
      <FormGroup>
        <UsernameChooser
          username={filterPanelValues.assignedUser}
          onUsernameChanged={assignedUser =>
            onFilterPanelValuesChanged({ ...filterPanelValues, assignedUser })}
        />
      </FormGroup>
      <FormGroup>
        <FiltersTimePicker
          startTime={filterPanelValues.startTime}
          endTime={filterPanelValues.endTime}
          onStartTimeChanged={startTime =>
            onFilterPanelValuesChanged({ ...filterPanelValues, startTime })}
          onEndTimeChanged={endTime => onFilterPanelValuesChanged(
            { ...filterPanelValues, endTime })}
        />
      </FormGroup>
      <FormGroup>
        <FiltersCompletedStatePicker
          showCompleted={filterPanelValues.showCompleted}
          showIncomplete={filterPanelValues.showIncomplete}
          onCompletedStateSelected={(showCompleted, showIncomplete) => {
            onFilterPanelValuesChanged({ ...filterPanelValues, showCompleted, showIncomplete });
          }}
        />
      </FormGroup>
      <FormGroup>
        <FiltersApplyButton
          appliedFilters={appliedFilters}
          filterPanelValues={filterPanelValues}
          onClick={() => onFiltersApplied(filterPanelValues)}
        />
      </FormGroup>
    </Form>
  </Panel>);
}

FiltersPanel.propTypes = propTypes;

FiltersPanel.defaultProps = defaultProps;
