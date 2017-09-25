import repairs from '../../db/repairs';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function repairProposeComplete(req, res) {
  const repairById = repairs.getRepairById(+req.param('id'));
  if (repairById) {
    repairById.proposeComplete = true;
    repairs.updateRepair(repairById);
    res.json(wrap('ok'));
  } else {
    res.status(404);
    res.json(wrap(null, `there is no repair with ${req.param('id')}`, errorCodes.not_found));
  }
}
