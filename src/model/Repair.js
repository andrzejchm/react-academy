import PropTypes from 'prop-types';
import { userFromApiResponse, UserShape } from './User';

export default class Repair {
  constructor(id = null, startDateString = null, endDateString = null,
    isCompleted = false, assignedUser = null, proposeComplete = false) {
    this.id = id;
    this.startDate = startDateString;
    this.endDate = endDateString;
    this.isCompleted = isCompleted;
    this.assignedUser = assignedUser;
    this.proposeComplete = proposeComplete;
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
    apiResponse.startDate,
    apiResponse.endDate,
    apiResponse.isCompleted,
    userFromApiResponse(apiResponse.assignedUser),
    apiResponse.proposeComplete,
  ) };
}

export const RepairShape = PropTypes.shape({
  id: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isCompleted: PropTypes.bool,
  assignedUser: UserShape,
});

export const SortTypes = [
  { value: 'DATE_ASC', label: 'Earliest time first' },
  { value: 'DATE_DESC', label: 'Latest time first' },
];
