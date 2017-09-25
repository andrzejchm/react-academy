import users from '../../db/users';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function deleteUser(req, res) {
  if (!req.params.username) {
    res.status(400);
    res.json(wrap(null, ' path param \'username\' is missing', errorCodes.invalid_parameter));
  } else {
    users.removeUser(req.params.username);
    res.json(wrap('ok'));
  }
}
