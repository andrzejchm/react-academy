import repairs from '../../db/repairs';
import wrap from '../responseWrapper';
import errorCodes from '../../config/errorCodes';

function validateRepair(req, res) {
  if (!req.body) {
    res.status(400);
    res.json(wrap(null, 'you have to provide \'repair\' object in body', errorCodes.invalid_parameter));
    return false;
  }
  if (!req.body.startDate) {
    res.status(400);
    res.json(wrap(null, 'repair parameter \'startDate\' is missing', errorCodes.invalid_parameter));
    return false;
  }
  if (!req.body.endDate) {
    res.status(400);
    res.json(wrap(null, 'repair parameter \'endDate\' is missing', errorCodes.invalid_parameter));
    return false;
  }
  if (req.body.assignedUser && !req.body.assignedUser.username) {
    res.status(400);
    res.json(wrap(null, 'assigned user is missing \'username\'', errorCodes.invalid_parameter));
    return false;
  }

  return true;
}

function updateRepair(req, res) {
  repairs.updateRepair(req.body);
  res.status(201);
  res.json(wrap('ok'));
}

function createRepair(req, res) {
  repairs.addRepair(req.body);
  res.status(201);
  res.json(wrap('ok'));
}

export default function repairCreate(req, res) {
  if (validateRepair(req, res)) {
    if (req.body.id) {
      updateRepair(req, res);
    } else {
      createRepair(req, res);
    }
  }
}
