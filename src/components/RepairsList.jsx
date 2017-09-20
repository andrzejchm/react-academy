import React from 'react';
import Radium from 'radium';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import { RepairShape } from '../model/Repair';
import RepairItem from './RepairItem';
import config from '../config/config';

function RepairsList({ repairsList, history }) {
  function onRepairClick(repair) {
    const repairDetails = config.routes.repairDetails(repair.id).path;
    history.push(repairDetails);
  }

  return (
    <ListGroup>
      {repairsList.map(repair =>
        (<RepairItem
          key={repair.id}
          repair={repair}
          onClick={() => onRepairClick(repair)}
        />))}
    </ListGroup>
  );
}

RepairsList.propTypes = {
  repairsList: PropTypes.arrayOf(RepairShape),
  history: ReactRouterPropTypes.history.isRequired,
};

RepairsList.defaultProps = {
  repairsList: [],
};
export default Radium(RepairsList);
