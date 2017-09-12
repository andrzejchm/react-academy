import passport from 'passport';
import bearer from 'passport-http-bearer';
import users from './db/users';

export default function configurePassport() {
  passport.use(new bearer.Strategy(
    (token, callback) => {
      const user = users.userWithToken(token);
      if (!user) {
        return callback(null, false);
      }
      return callback(null, user);
    }));

  return passport;
}
