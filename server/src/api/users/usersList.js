import users from '../../db/users';
import wrap from '../responseWrapper';

export default function usersList(req, res) {
  res.json(
    wrap(users.getUsersListBasic()));
}
