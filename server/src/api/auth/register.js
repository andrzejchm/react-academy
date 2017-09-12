import login from './login';
import users from '../../db/users';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';


export default function register(req, res) {
  if (users.getUser(req.body.username)) {
    res.status(400);
    res.json(wrap(null, 'user already exists',errorCodes.user_already_exists));
  } else {
    users.addUser({
      username: req.body.username,
      password: req.body.password,
    });
    login(req, res);
  }
}
