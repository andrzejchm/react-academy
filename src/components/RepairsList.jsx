import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ListGroup } from 'react-bootstrap';

import RepairItem from './RepairItem';
import config from '../config/config';
import InfoMessage from './InfoMessage';
import strings from '../config/strings';
import Spinner from './Spinner';
import { STATUS_LOADING, STATUS_NONE, STATUS_SUCCESS } from '../redux/actions/rest_api';
import ErrorMessage from './ErrorMessage';
import { RepairsListShape } from '../usecases/repairsListDuck';
import { UserInfoShape } from '../model/UserInfo';

const propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  repairsList: RepairsListShape,
  userInfo: UserInfoShape.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const defaultProps = {
  repairsList: [],
};

function RepairsList({ userInfo, repairsList, history, onRemoveClick }) {
  function onRepairClick(repair) {
    const repairDetails = config.routes.repairDetails(repair.id).path;
    history.push(repairDetails);
  }

  function hasRepairs() {
    return repairsList.status === STATUS_SUCCESS
      && repairsList.payload.length;
  }

  function repairsListIsEmpty() {
    return repairsList.status === STATUS_SUCCESS
      && !repairsList.payload.length;
  }

  function shouldShowLoading() {
    return repairsList.status === STATUS_NONE
      || repairsList.status === STATUS_LOADING;
  }

  if (hasRepairs()) {
    return (
      <ListGroup>
        {repairsList.payload.map(repair =>
          (<RepairItem
            userInfo={userInfo}
            key={repair.id}
            repair={repair}
            onRemoveClicked={() => onRemoveClick(repair)}
            onClick={() => onRepairClick(repair)}
          />))}
      </ListGroup>
    );
  } else if (repairsListIsEmpty()) {
    return (
      <InfoMessage
        info={strings.repairs_list_empty_message}
      />
    );
  } else if (shouldShowLoading()) {
    return (
      <Spinner
        name="line-scale"
      />
    );
  }
  return (
    <ErrorMessage
      error={repairsList.error}
    />
  );
}

RepairsList.propTypes = propTypes;

RepairsList.defaultProps = defaultProps;
export default Radium(RepairsList);
