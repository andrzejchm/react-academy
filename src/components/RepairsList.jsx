import React, { Component } from 'react';
import Radium from 'radium';
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

const propTypes = {
  repairsList: RepairsListShape,
  history: ReactRouterPropTypes.history.isRequired,
};

const defaultProps = {
  repairsList: [],
};

class RepairsList extends Component {
  onRepairClick(repair) {
    const repairDetails = config.routes.repairDetails(repair.id).path;
    this.props.history.push(repairDetails);
  }

  hasRepairs() {
    return this.props.repairsList.status === STATUS_SUCCESS
      && this.props.repairsList.payload.length;
  }

  repairsListIsEmpty() {
    return this.props.repairsList.status === STATUS_SUCCESS
      && !this.props.repairsList.payload.length;
  }

  shouldShowLoading() {
    return this.props.repairsList.status === STATUS_NONE
      || this.props.repairsList.status === STATUS_LOADING;
  }

  render() {
    if (this.hasRepairs()) {
      return (
        <ListGroup>
          {this.props.repairsList.payload.map(repair =>
            (<RepairItem
              key={repair.id}
              repair={repair}
              onClick={() => this.onRepairClick(repair)}
            />))}
        </ListGroup>
      );
    } else if (this.repairsListIsEmpty()) {
      return (
        <InfoMessage
          info={strings.repairs_list_empty_message}
        />
      );
    } else if (this.shouldShowLoading()) {
      return (
        <Spinner
          name="line-scale"
        />
      );
    }
    return (
      <ErrorMessage
        error={this.props.repairsList.error}
      />
    );
  }
}

RepairsList.propTypes = propTypes;

RepairsList.defaultProps = defaultProps;
export default Radium(RepairsList);
