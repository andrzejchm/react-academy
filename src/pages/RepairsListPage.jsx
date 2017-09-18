import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import Repair from '../model/Repair';
import RepairsList from '../components/RepairsList';
import { STATUS_LOADING, STATUS_NONE, STATUS_SUCCESS } from '../redux/actions/rest_api';
import ErrorMessage from '../components/ErrorMessage';
import InfoMessage from '../components/InfoMessage';
import strings from '../config/strings';
import { ApiResponseShape } from '../model/ApiResponse';

class RepairsListPage extends Component {
  componentWillMount() {
    this.props.getRepairsList();
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
        <div>
          <PageHeader>
            <small>{strings.repairs_list_header}</small>
          </PageHeader>
          <RepairsList
            repairsList={this.props.repairsList.payload}
            history={this.props.history}
          />
        </div>
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

RepairsListPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  repairsList: ApiResponseShape(PropTypes.arrayOf(Repair)),
  getRepairsList: PropTypes.func.isRequired,
};
RepairsListPage.defaultProps = {
  repairsList: null,
};

export default RepairsListPage;
