import wrap from '../responseWrapper';
import users from '../../db/users';
import errorCodes from '../../config/errorCodes';

export default function login(req, res) {
  if (users.credentialsMatch(req.body)) {
    const user = users.getUser(req.body.username);
    res.header('Access-Token', user.token);
    res.json(wrap({ username: req.body.username, role: user.role }, null));
  } else {
    res.status(401);
    res.json(wrap(null, 'invalid credentials', errorCodes.invalid_credentials));
  }
}
