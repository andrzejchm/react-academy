import wrap from '../responseWrapper';
import users from '../../db/users';
import errorCodes from '../../config/errorCodes';

export default function login(req, res) {
  if (users.credentialsMatch(req.body)) {
    const user = users.getWholeUserRow(req.body.username);
    res.header('Access-Token', user.token);
    res.json(wrap({ username: req.body.username, role: user.role }));
  } else {
    res.status(401);
    res.json(wrap(null, 'invalid credentials', errorCodes.invalid_credentials));
  }
}
