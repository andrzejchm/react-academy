import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import configurePassport from './auth';
import login from './api/auth/login';
import register from './api/auth/register';
import repairsList from './api/repairs/listRepairs';
import commentsList from './api/repairs/commentsList';
import searchUsers from './api/users/usersSearch';
import repairCreate from './api/repairs/repairCreate';
import repairDelete from './api/repairs/repairDelete';
import repairDetails from './api/repairs/repairDetails';
import repairUpdate from './api/repairs/repairUpdate';
import commentPost from './api/repairs/commentPost';
import usersList from './api/users/usersList';
import userDelete from './api/users/userDelete';

const app = express();

const passport = configurePassport();

// logger
app.use(morgan('dev'));

app.use(cors({
  exposedHeaders: ['Access-Token'],
}));
app.use(bodyParser.json());

const router = express.Router();

function authBearer() {
  return passport.authenticate('bearer', { session: false });
}

router.route('/')
  .get(authBearer(),
    (req, res) => {
      res.status(200);
      res.json('ok');
    });

router.route('/auth/login')
  .post((req, res) => login(req, res));

router.route('/auth/register')
  .post((req, res) => register(req, res));

router.route('/repairs')
  .get(authBearer(),
    (req, res) => repairsList(req, res));

router.route('/users')
  .get(authBearer(),
    (req, res) => usersList(req, res));

router.route('/users/:username')
  .delete(authBearer(),
    (req, res) => userDelete(req, res));

router.route('/repairs/:id')
  .get(authBearer(),
    (req, res) => repairDetails(req, res))
  .delete(authBearer(),
    (req, res) => repairDelete(req, res))
  .post(authBearer(),
    (req, res) => repairUpdate(req, res));

router.route('/repairs/:id/comments')
  .get(authBearer(),
    (req, res) => commentsList(req, res))
  .post(authBearer(),
    (req, res) => commentPost(req, res));


router.route('/repairs/create')
  .post(authBearer(),
    (req, res) => repairCreate(req, res));

router.route('/users/search')
  .get(authBearer(),
    (req, res) => searchUsers(req, res));
app.use('/api', router);

app.listen(8080, () => {
  /* eslint-disable no-console */
  console.log('example app listening on 8080');
  /* eslin-enable */
});

export default app;
