import repairs from '../../db/repairs';
import wrap from '../responseWrapper';

export default function repairDelete(req, res) {
  repairs.removeRepairById(+req.params.id);
  res.json(wrap('ok'));
}
