import MomentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import moment from 'moment';
import { UserShape } from './User';


export function getTodayUtcStart() {
  return moment().local().startOf('day').utcOffset(0, false);
}

export function toLocalStartOfDayInUtc(date) {
  return moment(date).local().startOf('day').utcOffset(0, false);
}


export function toLocalEndOfDayInUtc(date) {
  return moment(date).local().endOf('day').utcOffset(0, false);
}

export function localToUtcHour(value) {
  return value - (moment().utcOffset() / 60);
}

export function utcToLocalHour(value) {
  return value + (moment().utcOffset() / 60);
}

export default class RepairListFilters {
  constructor(
    date = getTodayUtcStart(),
    startTime = 0,
    endTime = 24,
    showCompleted = true,
    showIncomplete = true,
    assignedUser = null,
  ) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.showCompleted = showCompleted;
    this.showIncomplete = showIncomplete;
    this.assignedUser = assignedUser;
  }
}

export function isFiltering(filters) {
  return filters.date !== getTodayUtcStart() ||
    !filters.showCompleted ||
    !filters.showIncomplete ||
    filters.startTime !== localToUtcHour(0) ||
    filters.endTime !== localToUtcHour(24) ||
    filters.assignedUser;
}

export const RepairListFiltersShape = PropTypes.shape({
  date: MomentPropTypes.momentObj,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  showCompleted: PropTypes.bool,
  showIncomplete: PropTypes.bool,
  assignedUser: UserShape,
});
