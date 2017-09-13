import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import configurePassport from './auth';
import login from './api/auth/login';
import register from './api/auth/register';

const app = express();

const passport = configurePassport();

// logger
app.use(morgan('dev'));

app.use(cors({
  exposedHeaders: ['Access-Token'],
}));
app.use(bodyParser.json());

const router = express.Router();

router.get('/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    res.status(200);
    res.json('ok');
  });

router.post('/auth/login',
  (req, res) => login(req, res),
);

router.post('/auth/register',
  (req, res) => register(req, res),
);


app.use('/api', router);

app.listen(8080, () => {
  console.log('example app listening on 8080');
});

export default app;
