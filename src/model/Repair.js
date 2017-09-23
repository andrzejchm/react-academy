import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { userFromApiResponse, UserShape } from './User';

export default class Repair {
  constructor(id, startDateString, endDateString, isCompleted, assignedUser) {
    this.id = id;
    this.startDate = moment(startDateString);
    this.endDate = moment(endDateString);
    this.isCompleted = isCompleted;
    this.assignedUser = assignedUser;
  }

  toApiPayload() {
    return {
      ...this,
      startDate: this.startDate.valueOf(),
      endDate: this.endDate.valueOf(),
    };
  }
}

export function repairFromApiResponse(apiResponse) {
  return { ...new Repair(
    apiResponse.id,
    moment(apiResponse.startDate),
    moment(apiResponse.endDate),
    apiResponse.isCompleted,
    userFromApiResponse(apiResponse.assignedUser),
  ) };
}

export const RepairShape = PropTypes.shape({
  id: PropTypes.number,
  startDate: MomentPropTypes.momentObj,
  endDate: MomentPropTypes.momentObj,
  isCompleted: PropTypes.bool,
  assignedUser: UserShape,
});

export const SortTypes = [
  { value: 'DATE_ASC', label: 'Earliest time first' },
  { value: 'DATE_DESC', label: 'Latest time first' },
];
