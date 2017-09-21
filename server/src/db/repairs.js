import moment from 'moment';
import users from './users';

const repairs = [];
repairs.push({
  id: 1,
  name: 'abc',
  startDate: moment('2017-09-20T19:16:21+02:00'),
  endDate: moment('2017-09-20T20:16:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('user'),
});
repairs.push({
  id: 2,
  name: 'abc',
  startDate: moment('2017-09-20T18:15:21+02:00'),
  endDate: moment('2017-09-20T19:15:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairs.push({
  id: 3,
  name: 'abc',
  startDate: moment('2017-09-20T17:14:11+02:00'),
  endDate: moment('2017-09-20T18:14:11+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('user'),
});
repairs.push({
  id: 4,
  name: 'abc',
  startDate: moment('2017-09-20T16:13:01+02:00'),
  endDate: moment('2017-09-20T17:13:01+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairs.push({
  id: 5,
  name: 'abc',
  startDate: moment('2017-09-20T15:11:21+02:00'),
  endDate: moment('2017-09-20T16:11:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairs.push({
  id: 6,
  name: 'abc',
  startDate: moment('2017-09-20T14:10:21+02:00'),
  endDate: moment('2017-09-20T15:10:21+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairs.push({
  id: 7,
  name: 'abc',
  startDate: moment('2017-09-20T13:09:21+02:00'),
  endDate: moment('2017-09-20T14:09:21+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairs.push({
  id: 8,
  name: 'abc',
  startDate: moment('2017-09-20T12:08:21+02:00'),
  endDate: moment('2017-09-14T13:08:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});

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

function isInDateRange(value, fromInclusive, momentDateToExclusive) {
  return value.startDate.isBetween(fromInclusive, momentDateToExclusive) &&
    value.endDate.isBetween(fromInclusive, momentDateToExclusive);
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

export default {
  getForDateRange: (momentDateFromInclusive, momentDateToExclusive, sortType = 'DATE_ASC', username = '') => {
    const fromInclusive = moment(momentDateFromInclusive).subtract(1, 'ms');
    const result = [];
    repairs.forEach((value) => {
      if (isInDateRange(value, fromInclusive, momentDateToExclusive)
        && usernameMatches(value, username)) {
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
};
