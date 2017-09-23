import users from '../../db/users';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function listUsers(req, res) {
  // if (!req.query.username) {
  //   console.log('INVALID USERS');
  //   res.status(400);
  //   res.json(wrap(null, `query parameter 'username' must be a valid string, but was: ${req.query.username}`, errorCodes.invalid_parameter));
  // } else if (req.query.username.length < 3) {
  //   console.log('LENGTH < 3');
  //   res.status(400);
  //   res.json(wrap(null, 'query parameter \'name\' must be at least 3 characters long'));
  // } else {
  res.json(
    wrap(
      users.getUsersContainingUsername(
        req.query.username,
      )));
  // }
}
