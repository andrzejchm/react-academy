import moment from 'moment';
import repairs, { repairsList } from '../repairs';
import users from '../users';

while (repairsList.length) {
  repairsList.pop();
}
repairsList.push({
  id: 1,
  startDate: moment('2017-09-20T19:16:21+02:00'),
  endDate: moment('2017-09-20T20:16:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('user'),
});
repairsList.push({
  id: 2,
  startDate: moment('2017-09-20T18:15:21+02:00'),
  endDate: moment('2017-09-20T19:15:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsList.push({
  id: 3,
  startDate: moment('2017-09-20T17:14:11+02:00'),
  endDate: moment('2017-09-20T18:14:11+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('user'),
});
repairsList.push({
  id: 4,
  startDate: moment('2017-09-20T16:13:01+02:00'),
  endDate: moment('2017-09-20T17:13:01+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsList.push({
  id: 5,
  startDate: moment('2017-09-20T15:11:21+02:00'),
  endDate: moment('2017-09-20T16:11:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsList.push({
  id: 6,
  startDate: moment('2017-09-20T14:10:21+02:00'),
  endDate: moment('2017-09-20T15:10:21+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsList.push({
  id: 7,
  startDate: moment('2017-09-20T13:09:21+02:00'),
  endDate: moment('2017-09-20T14:09:21+02:00'),
  isCompleted: false,
  assignedUser: users.getUserBasic('andrzejchm'),
});
repairsList.push({
  id: 8,
  startDate: moment('2017-09-20T12:08:21+02:00'),
  endDate: moment('2017-09-14T13:08:21+02:00'),
  isCompleted: true,
  assignedUser: users.getUserBasic('andrzejchm'),
});

it('getForDateRange returns items sorted by date ascending', () => {
  const dateFromInclusive = moment('2017-09-20T00:00:00+02:00');
  const dateToExclusive = moment('2017-09-20T16:16:00+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive).map(elem => elem.id))
    .toEqual([7, 6, 5]);
});

it('getForDateRange returns no items for date range without items', () => {
  const dateFromInclusive = moment('2017-05-15T12:00:00+02:00');
  const dateToExclusive = moment('2017-06-16T12:00:00+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive).map(elem => elem.id))
    .toEqual([]);
});

it('getForDateRange dateFrom is inclusive', () => {
  const dateFromInclusive = moment('2017-09-20T19:16:21+02:00');
  const dateToExclusive = moment('2017-09-20T21:16:21+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive).map(elem => elem.id))
    .toEqual([1]);
});

it('getForDateRange dateTo is exclusive', () => {
  const dateFromInclusive = moment('2017-09-15T13:09:20+02:00');
  const dateToExclusive = moment('2017-09-15T13:09:21+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive).map(elem => elem.id))
    .toEqual([]);
});
