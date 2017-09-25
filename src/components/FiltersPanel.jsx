import React from 'react';
import { ControlLabel, Form, FormGroup, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'react-dates/lib/css/_datepicker.css';
import { RepairListFiltersShape } from '../model/RepairListFilters';
import SingleDayPicker from './SingleDayPicker';
import FiltersApplyButton from './FiltersApplyButton';
import FiltersTimePicker from './FiltersTimePicker';
import FiltersCompletedStatePicker from './FiltersCompletedStatePicker';
import strings from '../config/strings';
import ChooseUserDropDown from './ChooseUserDropDown';
import { FilterPanelShape } from '../usecases/repairsFiltersPanelDuck';

const propTypes = {
  filterPanel: FilterPanelShape.isRequired,
  appliedFilters: RepairListFiltersShape.isRequired,
  expanded: PropTypes.bool.isRequired,
  onFilterPanelValuesChanged: PropTypes.func.isRequired,
  onFiltersApplied: PropTypes.func.isRequired,
  getUsersByName: PropTypes.func.isRequired,
};

const defaultProps = {
  inputType: null,
};

export default function FiltersPanel({
  appliedFilters,
  filterPanel,
  expanded,
  onFilterPanelValuesChanged,
  onFiltersApplied,
  getUsersByName,
}) {
  return (<Panel collapsible expanded={expanded}>
    <Form inline>
      <FormGroup>
        <ControlLabel
          style={{ marginRight: '6px' }}
        >{strings.filter_label_choose_day}</ControlLabel>&nbsp;
        <SingleDayPicker
          date={filterPanel.filters.date}
          onDayChanged={date =>
            onFilterPanelValuesChanged({ ...filterPanel.filters, date })}
        />
      </FormGroup>
      <ControlLabel style={{ marginLeft: '16px' }}>
        {strings.filter_label_choose_user}
      </ControlLabel>
      <FormGroup
        style={{ width: '150px',
          verticalAlign: 'middle',
          display: 'inline-block',
          paddingLeft: '6px' }}
      >
        <ChooseUserDropDown
          getUsersByName={getUsersByName}
          users={filterPanel.users}
          selectedUser={filterPanel.filters.assignedUser}
          onUserSelected={assignedUser =>
            onFilterPanelValuesChanged({ ...filterPanel.filters, assignedUser })}
        />
      </FormGroup>
      <FormGroup>
        <FiltersTimePicker
          startTime={filterPanel.filters.startTime}
          endTime={filterPanel.filters.endTime}
          onStartTimeChanged={startTime =>
            onFilterPanelValuesChanged({ ...filterPanel.filters, startTime })}
          onEndTimeChanged={endTime => onFilterPanelValuesChanged(
            { ...filterPanel.filters, endTime })}
        />
      </FormGroup>
      <FormGroup>
        <FiltersCompletedStatePicker
          showCompleted={filterPanel.filters.showCompleted}
          showIncomplete={filterPanel.filters.showIncomplete}
          onCompletedStateSelected={(showCompleted, showIncomplete) => {
            onFilterPanelValuesChanged({ ...filterPanel.filters, showCompleted, showIncomplete });
          }}
        />
      </FormGroup>
      <FormGroup>
        <FiltersApplyButton
          appliedFilters={appliedFilters}
          filterPanelValues={filterPanel.filters}
          onClick={() => onFiltersApplied(filterPanel.filters)}
        />
      </FormGroup>
    </Form>
  </Panel>);
}

FiltersPanel.propTypes = propTypes;

FiltersPanel.defaultProps = defaultProps;
