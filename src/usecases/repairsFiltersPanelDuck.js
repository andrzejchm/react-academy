import PropTypes from 'prop-types';
import { LOCATION_CHANGE } from 'react-router-redux';
import RepairListFilters, { RepairListFiltersShape } from '../model/RepairListFilters';
import config from '../config/config';
import { ACTION_USER_LOGOUT } from '../usecases/authDuck';
import { ACTION_REPAIRS_LIST_FILTERS_APPLIED } from './repairsListDuck';

const ACTION_TOGGLE_REPAIRS_LIST_FILTERS_VISIBILITY = 'REPAIRS_FILTERS_PANEL/TOGGLE_VISIBILITY';
const ACTION_FILTER_PANEL_VALUES_CHANGED = 'REPAIRS_FILTERS_PANEL/VALUES_CHANGED';


export const initialState = {
  filters: { ...new RepairListFilters() },
  expanded: false,
};

function toggleFiltersVisibilityReducer(state) {
  return { ...state, expanded: !state.expanded };
}

function locationChangedReducer(state, action) {
  if (action.payload.pathname !== config.routes.repairs.path) {
    return initialState;
  }
  return state;
}

function changeFiltersReducer(state, action) {
  return { ...state, filters: action.payload };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type.split('#')[0]) {
    case LOCATION_CHANGE:
      return locationChangedReducer(state, action);
    case ACTION_USER_LOGOUT:
      return initialState;
    case ACTION_REPAIRS_LIST_FILTERS_APPLIED:
      return changeFiltersReducer(toggleFiltersVisibilityReducer(state), action);
    case ACTION_FILTER_PANEL_VALUES_CHANGED:
      return changeFiltersReducer(state, action);
    case ACTION_TOGGLE_REPAIRS_LIST_FILTERS_VISIBILITY:
      return toggleFiltersVisibilityReducer(state);
    default:
      return state;
  }
}

export function toggleFiltersVisibility() {
  return { type: ACTION_TOGGLE_REPAIRS_LIST_FILTERS_VISIBILITY };
}

export function filterPanelValuesChanged(filterPanelValues) {
  return { type: ACTION_FILTER_PANEL_VALUES_CHANGED, payload: filterPanelValues };
}

export const FilterPanelShape = PropTypes.shape({
  expanded: PropTypes.bool,
  appliedFilters: RepairListFiltersShape,
});
