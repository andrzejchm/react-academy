import repairs from '../../db/repairs';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function repairDelete(req, res) {
  repairs.removeRepairById(+req.params.id);
  res.json(wrap('ok'));
}
