import MomentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import moment from 'moment';


function getTodayStart() {
  return moment().startOf('day');
}
function getTodayEnd() {
  return moment().endOf('day');
}

export default class RepairListFilters {
  constructor(
    startDate = getTodayStart(),
    endDate = getTodayEnd(),
    startTime = 0,
    endTime = 24,
    showCompleted = true,
    showIncomplete = true,
    assignedUser = '',
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
    filters.startTime !== 0 ||
    filters.endTime !== 24 ||
    filters.assignedUser;
}

export const RepairListFiltersShape = PropTypes.shape({
  startDate: MomentPropTypes.momentObj,
  endDate: MomentPropTypes.momentObj,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  showCompleted: PropTypes.bool,
  showIncomplete: PropTypes.bool,
  assignedUser: PropTypes.string,
});
