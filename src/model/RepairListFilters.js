import MomentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import moment from 'moment';

export const DEFAULT_SORT_TYPE = 'DATE_ASC';

function getTodayStart() {
  return moment().startOf('day');
}
function getTodayEnd() {
  return moment().endOf('day').add(1, 'ms');
}

export default class RepairListFilters {
  constructor(
    startDate = getTodayStart(),
    endDate = getTodayEnd(),
    sortType = DEFAULT_SORT_TYPE,
    showCompleted = true,
    showIncomplete = true,
    assignedUser = null,
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.sortType = sortType;
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
    filters.assignedUser;
}

export const RepairListFiltersShape = PropTypes.shape({
  startDate: MomentPropTypes.momentObj,
  endDate: MomentPropTypes.momentObj,
  sortType: PropTypes.string,
  showCompleted: PropTypes.bool,
  showIncomplete: PropTypes.bool,
  assignedUser: PropTypes.string,
});
