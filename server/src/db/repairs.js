import moment from 'moment';
import users from './users';

let repairsListInternal = [];
repairsListInternal.push({
  id: 1,
  startDate: moment('2017-09-24T22:00:00Z'),
  endDate: moment('2017-09-24T23:00:00Z'),
  isCompleted: true,
  assignedUser: 'user',
});
repairsListInternal.push({
  id: 2,
  startDate: moment('2017-09-24T23:00:00Z'),
  endDate: moment('2017-09-25T00:00:00Z'),
  isCompleted: true,
  assignedUser: 'user',
});
repairsListInternal.push({
  id: 3,
  startDate: moment('2017-09-25T00:00:00Z'),
  endDate: moment('2017-09-25T01:00:00Z'),
  isCompleted: true,
  assignedUser: 'user',
});
repairsListInternal.push({
  id: 4,
  startDate: moment('2017-09-25T01:00:00Z'),
  endDate: moment('2017-09-25T02:00:00Z'),
  isCompleted: true,
  assignedUser: 'andrzejchm',
});
repairsListInternal.push({
  id: 5,
  startDate: moment('2017-09-25T02:00:00Z'),
  endDate: moment('2017-09-25T03:00:00Z'),
  isCompleted: false,
  assignedUser: 'user',
});
repairsListInternal.push({
  id: 6,
  startDate: moment('2017-09-25T03:00:00Z'),
  endDate: moment('2017-09-25T04:00:00Z'),
  isCompleted: false,
  assignedUser: 'andrzejchm',
});
repairsListInternal.push({
  id: 7,
  startDate: moment('2017-09-25T04:00:00Z'),
  endDate: moment('2017-09-25T05:00:00Z'),
  isCompleted: true,
  assignedUser: 'andrzejchm',
});
repairsListInternal.push({
  id: 8,
  startDate: moment('2017-09-25T05:00:00Z'),
  endDate: moment('2017-09-25T06:00:00Z'),
  isCompleted: false,
  assignedUser: 'andrzejchm',
});
repairsListInternal.push({
  id: 9,
  startDate: moment('2017-09-25T06:00:00Z'),
  endDate: moment('2017-09-25T07:00:00Z'),
  isCompleted: false,
  assignedUser: 'andrzejchm',
});
repairsListInternal.push({
  id: 10,
  startDate: moment('2017-09-25T07:00:00Z'),
  endDate: moment('2017-09-25T08:00:00Z'),
  isCompleted: true,
  assignedUser: 'andrzejchm',
});
repairsListInternal.push({
  id: 11,
  startDate: moment('2017-09-25T21:00:00Z'),
  endDate: moment('2017-09-25T22:00:00Z'),
  isCompleted: true,
  assignedUser: 'andrzejchm',
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
      return value.assignedUser.toLowerCase().indexOf(username.toLowerCase()) !== -1;
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

function repairWithUser(repair) {
  if (typeof repair.assignedUser === 'string') {
    return { ...repair, assignedUser: users.getUserBasic(repair.assignedUser) };
  }
  return { ...repair };
}

const dao = {
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

    return result.map(repair => repairWithUser(repair));
  },

  removeRepairById: (id) => {
    repairsListInternal = repairsListInternal.filter(elem => elem.id !== id);
  },

  getRepairById: id => repairWithUser(repairsListInternal.find(elem => elem.id === +id)),

  updateRepair: (repair) => {
    // eslint-disable-next-line no-console
    console.log(`\n\nupdating repair: ${JSON.stringify(repair)}\n\n`);
    dao.removeRepairById(repair.id);
    dao.addRepair(repair);
  },

  addRepair: (repair) => {
    const id = repair.id ? repair.id : getUniqueId();

    const assignedUser = typeof repair.assignedUser === 'object'
      ? repair.assignedUser.username
      : repair.assignedUser;

    const repairToAdd = {
      ...repair,
      id,
      startDate: moment(repair.startDate),
      endDate: moment(repair.endDate),
      assignedUser,
    };
    repairsListInternal.push(repairToAdd);
  },
};

export default dao;
