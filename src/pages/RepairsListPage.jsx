import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Select from 'react-select';

import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Spinner from '../components/Spinner';
import { SortTypes } from '../model/Repair';
import RepairsList from '../components/RepairsList';
import { STATUS_LOADING, STATUS_NONE, STATUS_SUCCESS } from '../redux/actions/rest_api';
import ErrorMessage from '../components/ErrorMessage';
import InfoMessage from '../components/InfoMessage';
import FilterButton from '../components/FilterButton';
import strings from '../config/strings';
import { RepairsListShape } from '../usecases/repairsUseCases';
import FiltersPanel from '../components/FiltersPanel';


export default class RepairsListPage extends Component {
  componentWillMount() {
    this.props.getRepairsList(this.props.repairsList.filters);
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

  sortChanged(sortType) {
    const filters = this.props.repairsList.filters;
    filters.sortType = sortType;
    this.props.getRepairsList(filters);
  }
  render() {
    if (this.hasRepairs()) {
      return (
        <div>
          <Row>
            <Col xs={12} sm={8} style={{ lineHeight: '34px' }}>
              <h4>{strings.repairs_list_header}</h4>
            </Col>
            <Col xs={9} sm={3}>
              <Select
                clearable={false}
                searchable={false}
                value={this.props.repairsList.filters.sortType}
                options={SortTypes}
                onChange={val => this.sortChanged(val.value)}
              />
            </Col>
            <Col xs={3} sm={1} className="text-right">
              <FilterButton
                isPressed={this.props.repairsList.filtersPanelExpanded}
                onClick={() => this.props.filtersButtonClicked()}
              />
            </Col>
          </Row>
          <FiltersPanel
            filters={this.props.repairsList.filters}
            expanded={this.props.repairsList.filtersPanelExpanded}
          />
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
  repairsList: RepairsListShape.isRequired,
  getRepairsList: PropTypes.func.isRequired,
  filtersButtonClicked: PropTypes.func.isRequired,
};
