import moment from 'moment';
import comments from '../../db/comments';
import users from '../../db/users';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function commentsList(req, res) {
  if (!req.body.contents) {
    res.status(400);
    res.json(wrap(null, 'comment is missing "contents" field', errorCodes.invalid_parameter));
  } else if (!req.body.date) {
    res.status(400);
    res.json(wrap(null, 'comment is missing "date" field', errorCodes.invalid_parameter));
  }
  const comm = comments.getCommentsForRepair(req.params.id);
  comm.push({
    contents: req.body.contents,
    date: moment(req.body.date).format(),
    user: users.getUserBasic(req.user.username),
  });
  res.status(201);
  res.send(wrap('ok'));
}
