import users from '../../db/users';
import wrap from '../responseWrapper';

export default function listUsersByUsername(req, res) {
  res.json(
    wrap(
      users.getUsersContainingUsername(
        req.query.username,
      ).slice(0, 10)));
}
