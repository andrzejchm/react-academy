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
    res.json(
      wrap(
        repairs.getForDateRange(
          moment(+req.query.from),
          moment(+req.query.to),
          req.query.sortType,
          req.query.assignedUser,
          req.query.showIncomplete === 'true',
          req.query.showCompleted === 'true',
        )));
  }
}
