import moment from 'moment';
import users from './users';

let repairsListInternal = [];
repairsListInternal.push({
  id: 1,
  startDate: moment('2017-09-20T19:16:21Z'),
  endDate: moment('2017-09-20T20:16:21Z'),
  isCompleted: true,
  assignedUser: users.getUserBasic('user'),
});
repairsListInternal.push({
  id: 2,
  startDate: moment('2017-09-20T18:15:21Z'),
  endDate: moment('2017-09-20T19:15:21Z'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsListInternal.push({
  id: 3,
  startDate: moment('2017-09-20T17:14:11Z'),
  endDate: moment('2017-09-20T18:14:11Z'),
  isCompleted: false,
  assignedUser: users.getUserBasic('user'),
});
repairsListInternal.push({
  id: 4,
  startDate: moment('2017-09-20T16:13:01Z'),
  endDate: moment('2017-09-20T17:13:01Z'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsListInternal.push({
  id: 5,
  startDate: moment('2017-09-20T15:11:21Z'),
  endDate: moment('2017-09-20T16:11:21Z'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsListInternal.push({
  id: 6,
  startDate: moment('2017-09-20T14:10:21Z'),
  endDate: moment('2017-09-20T15:10:21Z'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsListInternal.push({
  id: 7,
  startDate: moment('2017-09-20T13:09:21Z'),
  endDate: moment('2017-09-20T14:09:21Z'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsListInternal.push({
  id: 8,
  startDate: moment('2017-09-20T12:08:21Z'),
  endDate: moment('2017-09-14T13:08:21Z'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});

export const repairsList = repairsListInternal;

function sortDateAscending(result) {
  result.sort((left, right) => {
    if (left.startDate.isBefore(right.startDate)) {
      return -1;
    } else if (right.startDate.isBefore(left.startDate)) {
      return 1;
    }
    return 0;
  });
}

function sortDateDescending(result) {
  result.sort((left, right) => {
    if (left.startDate.isBefore(right.startDate)) {
      return 1;
    } else if (right.startDate.isBefore(left.startDate)) {
      return -1;
    }
    return 0;
  });
}

export function overlapsWitDateRange(value, fromExclusive, toExclusive) {
  const valueIsSupersetOfRange = value.startDate.isBefore(moment(fromExclusive).add(1, 'ms'))
    && value.endDate.isAfter(moment(toExclusive).subtract(1, 'ms'));

  const valuePartialyOverlapsRange = value.startDate.isBetween(fromExclusive, toExclusive) ||
    value.endDate.isBetween(fromExclusive, toExclusive);
  return valuePartialyOverlapsRange || valueIsSupersetOfRange;
}

function usernameMatches(value, username) {
  if (username) {
    if (value.assignedUser) {
      return value.assignedUser.username.toLowerCase().indexOf(username.toLowerCase()) !== -1;
    }
    return false;
  }
  return true;
}

function completeStatusMatches(value, showIncomplete, showCompleted) {
  return (showCompleted && showIncomplete) ||
    (showCompleted && value.isCompleted) ||
    (showIncomplete && !value.isCompleted);
}

function getUniqueId() {
  let id = 1;
  // eslint-disable-next-line no-loop-func
  while (repairsListInternal.find(elem => elem.id === id)) {
    id += 1;
  }
  return id;
}

export default {
  getForDateRange: (momentDateFromInclusive, momentDateToExclusive, sortType = 'DATE_ASC',
    username = '', showIncomplete = true, showCompleted = true) => {
    const momentDateFromExclusive = moment(momentDateFromInclusive).subtract(1, 'ms');
    const result = [];

    repairsListInternal.forEach((value) => {
      if (overlapsWitDateRange(value, momentDateFromExclusive, momentDateToExclusive) &&
        usernameMatches(value, username) &&
        completeStatusMatches(value, showIncomplete, showCompleted)) {
        result.push(value);
      }
    });
    switch (sortType) {
      case 'DATE_DESC':
        sortDateDescending(result);
        break;
      case 'DATE_ASC':
      default:
        sortDateAscending(result);
        break;
    }

    return result;
  },

  removeRepairById: (id) => {
    repairsListInternal = repairsListInternal.filter(elem => elem.id !== id);
  },

  updateRepair: (repair) => {
    // eslint-disable-next-line no-console
    this.removeRepairById(repair.id);
    this.addRepair(repair);
  },

  addRepair: (repair) => {
    const repairToAdd = {
      ...repair,
      id: getUniqueId(),
      startDate: moment(repair.startDate),
      endDate: moment(repair.endDate),
    };
    // eslint-disable-next-line no-console
    repairsListInternal.push(repairToAdd);
  },
};
