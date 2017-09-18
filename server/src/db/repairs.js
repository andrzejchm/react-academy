import moment from 'moment';

const repairs = [];
repairs.push({ id: 1, name: 'abc', dateTime: moment('2017-09-18T19:16:21+02:00') });
repairs.push({ id: 2, name: 'abc', dateTime: moment('2017-09-18T18:15:21+02:00') });
repairs.push({ id: 3, name: 'abc', dateTime: moment('2017-09-15T17:14:11+02:00') });
repairs.push({ id: 4, name: 'abc', dateTime: moment('2017-09-15T16:13:01+02:00') });
repairs.push({ id: 5, name: 'abc', dateTime: moment('2017-09-15T15:11:21+02:00') });
repairs.push({ id: 6, name: 'abc', dateTime: moment('2017-09-15T14:10:21+02:00') });
repairs.push({ id: 7, name: 'abc', dateTime: moment('2017-09-15T13:09:21+02:00') });
repairs.push({ id: 8, name: 'abc', dateTime: moment('2017-09-14T12:08:21+02:00') });

export default {
  getForDateRange: (momentDateFromInclusive, momentDateToExclusive) => {
    const fromInclusive = moment(momentDateFromInclusive).subtract(1, 'ms');
    const result = [];
    repairs.forEach((value) => {
      if (value.dateTime.isBetween(fromInclusive, momentDateToExclusive)) {
        result.push(value);
      }
    });
    result.sort((left, right) => {
      if (left.dateTime.isBefore(right.dateTime)) {
        return -1;
      } else if (right.dateTime.isBefore(left.dateTime)) {
        return 1;
      }
      return 0;
    });
    return result;
  },
};
