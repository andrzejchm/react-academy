import moment from 'moment';
import users from './users';

const commentsDictionary = {
  1: [
    {
      user: users.getUserBasic('andrzejchm'),
      contents: 'sample comment here',
      date: moment('2017-09-23T23:00:00Z'),
    },
  ],
};


const dao = {
  getCommentsForRepair: id => (commentsDictionary[id] ?
    commentsDictionary[id].sort((left, right) => {
      if (moment(left.date).isBefore(moment(right.date))) {
        return -1;
      } else if (moment(right.date).isBefore(moment(left.date))) {
        return 1;
      }
      return 0;
    })
    : []),
};

export default dao;
