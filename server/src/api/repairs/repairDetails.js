import repairs from '../../db/repairs';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function repairDetails(req, res) {
  const repairById = repairs.getRepairById(+req.param('id'));
  if (repairById) {
    res.json(wrap(repairById));
  } else {
    res.status(404);
    res.json(wrap(null, `there is no repair with ${req.param('id')}`, errorCodes.not_found));
  }
}
