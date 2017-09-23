import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import configurePassport from './auth';
import login from './api/auth/login';
import register from './api/auth/register';
import repairsList from './api/repairs/listRepairs';
import usersList from './api/users/listUsers';
import repairCreate from './api/repairs/repairCreate';
import repairDelete from './api/repairs/repairDelete';

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

router.route('/repairs/:id')
  .delete(authBearer(),
    (req, res) => repairDelete(req, res));

router.route('/repairs/create')
  .post(authBearer(),
    (req, res) => repairCreate(req, res));

router.route('/users/search')
  .get(authBearer(),
    (req, res) => usersList(req, res));
app.use('/api', router);

app.listen(8080, () => {
  /* eslint-disable no-console */
  console.log('example app listening on 8080');
  /* eslin-enable */
});

export default app;
