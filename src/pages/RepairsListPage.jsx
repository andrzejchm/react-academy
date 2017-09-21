import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import RepairsList from '../components/RepairsList';
import FiltersPanelToggleButton from '../components/FilterButton';
import { RepairsListShape } from '../usecases/repairsListDuck';
import { FilterPanelShape } from '../usecases/repairsFiltersPanelDuck';
import FiltersPanel from '../components/FiltersPanel';
import FiltersSortTypeSelector from '../components/FiltersSortTypeSelector';

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  repairsList: RepairsListShape.isRequired,
  filterPanel: FilterPanelShape.isRequired,
  triggerRepairsListFetch: PropTypes.func.isRequired,
  filtersApplied: PropTypes.func.isRequired,
  sortTypeChanged: PropTypes.func.isRequired,
  filtersButtonClicked: PropTypes.func.isRequired,
  onFilterPanelValuesChanged: PropTypes.func.isRequired,
};

export default class RepairsListPage extends Component {
  componentWillMount() {
    this.props.triggerRepairsListFetch(this.props.repairsList.appliedFilters);
  }

  render() {
    const { filterPanel, repairsList, history, onFilterPanelValuesChanged,
      filtersApplied } = this.props;
    return (
      <div>
        <Row>
          <Col xs={12} sm={8} style={{ lineHeight: '34px' }}>
            <h4>{repairsList.appliedFilters.startDate.format('D MMM')}</h4>
          </Col>
          <Col xs={9} sm={3}>
            <FiltersSortTypeSelector
              sortType={repairsList.sortType}
              onSortTypeChanged={sortType => this.props.sortTypeChanged(sortType)}
            />
          </Col>
          <Col xs={3} sm={1} className="text-right">
            <FiltersPanelToggleButton
              isPressed={filterPanel.expanded}
              onClick={() => this.props.filtersButtonClicked()}
            />
          </Col>
        </Row>
        <FiltersPanel
          appliedFilters={repairsList.appliedFilters}
          filterPanelValues={filterPanel.filters}
          onFilterPanelValuesChanged={filters => onFilterPanelValuesChanged(filters)}
          onFiltersApplied={filters => filtersApplied(filters)}
          expanded={filterPanel.expanded}
        />
        <RepairsList
          repairsList={repairsList}
          history={history}
        />
      </div>
    );
  }
}

RepairsListPage.propTypes = propTypes;
