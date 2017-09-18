import moment from 'moment';
import repairs from '../repairs';

it('getForDateRange returns items sorted by date ascending', () => {
  const dateFromInclusive = moment('2017-09-15T12:00:00+02:00');
  const dateToExclusive = moment('2017-09-16T12:00:00+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive))
    .toEqual([
      { id: 7, name: 'abc', dateTime: moment('2017-09-15T13:09:21+02:00') },
      { id: 6, name: 'abc', dateTime: moment('2017-09-15T14:10:21+02:00') },
      { id: 5, name: 'abc', dateTime: moment('2017-09-15T15:11:21+02:00') },
      { id: 4, name: 'abc', dateTime: moment('2017-09-15T16:13:01+02:00') },
      { id: 3, name: 'abc', dateTime: moment('2017-09-15T17:14:11+02:00') },
    ]);
});

it('getForDateRange returns no items for date range without items', () => {
  const dateFromInclusive = moment('2017-05-15T12:00:00+02:00');
  const dateToExclusive = moment('2017-06-16T12:00:00+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive))
    .toEqual([]);
});

it('getForDateRange dateFrom is inclusive', () => {
  const dateFromInclusive = moment('2017-09-15T13:09:21+02:00');
  const dateToExclusive = moment('2017-09-15T13:09:23+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive))
    .toEqual([
      { id: 7, name: 'abc', dateTime: moment('2017-09-15T13:09:21+02:00') },
    ]);
});

it('getForDateRange dateTo is exclusive', () => {
  const dateFromInclusive = moment('2017-09-15T13:09:20+02:00');
  const dateToExclusive = moment('2017-09-15T13:09:21+02:00');

  expect(repairs.getForDateRange(dateFromInclusive, dateToExclusive))
    .toEqual([]);
});
