import moment from 'moment';
import repairs from '../../db/repairs';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function listRepairs(req, res) {
  if (!req.query.from) {
    res.status(400);
    res.json(wrap(null, `query parameter 'from' must be a valid unix timestamp (seconds), but was: ${req.query.from}`, errorCodes.invalid_parameter));
  } else if (!req.query.to) {
    res.status(400);
    res.json(wrap(null, `query parameter 'to' must be a valid unix timestamp (seconds), but was: ${req.query.to}`, errorCodes.invalid_parameter));
  } else {
    res.json(wrap(repairs.getForDateRange(moment.unix(req.query.from), moment.unix(req.query.to), req.query.sortType)));
  }
}
