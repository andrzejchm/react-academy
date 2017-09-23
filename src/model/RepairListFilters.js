import MomentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import moment from 'moment';
import { UserShape } from './User';


export function getTodayStart() {
  return moment().utcOffset(0).startOf('day');
}

function getTodayEnd() {
  return moment().utcOffset(0).endOf('day');
}

export function localToUtcHour(value) {
  return value - (moment().utcOffset() / 60);
}

export function utcToLocalHour(value) {
  return value + (moment().utcOffset() / 60);
}

export default class RepairListFilters {
  constructor(
    startDate = getTodayStart(),
    endDate = getTodayEnd(),
    startTime = localToUtcHour(0),
    endTime = localToUtcHour(24),
    showCompleted = true,
    showIncomplete = true,
    assignedUser = null,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.showCompleted = showCompleted;
    this.showIncomplete = showIncomplete;
    this.assignedUser = assignedUser;
  }
}

export function isFiltering(filters) {
  return filters.startDate !== getTodayStart() ||
    filters.endDate !== getTodayEnd() ||
    !filters.showCompleted ||
    !filters.showIncomplete ||
    filters.startTime !== localToUtcHour(0) ||
    filters.endTime !== localToUtcHour(24) ||
    filters.assignedUser;
}

export const RepairListFiltersShape = PropTypes.shape({
  startDate: MomentPropTypes.momentObj,
  endDate: MomentPropTypes.momentObj,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  showCompleted: PropTypes.bool,
  showIncomplete: PropTypes.bool,
  assignedUser: UserShape,
});
