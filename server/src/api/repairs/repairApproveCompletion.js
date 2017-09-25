import repairs from '../../db/repairs';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

export default function repairApproveCompletion(req, res) {
  const repairById = repairs.getRepairById(+req.param('id'));
  if (repairById) {
    if (!repairById.proposeComplete) {
      res.status(400);
      res.json(wrap(null, 'repair was not proposed for completion', errorCodes.not_found));
    } else {
      repairById.isCompleted = true;
      repairById.proposeComplete = false;
      repairs.updateRepair(repairById);
      res.json(wrap('ok'));
    }
  } else {
    res.status(404);
    res.json(wrap(null, `there is no repair with ${req.param('id')}`, errorCodes.not_found));
  }
}
