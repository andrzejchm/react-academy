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
import { UserInfoShape } from '../model/UserInfo';
import CreateRepairButton from '../components/CreateRepairButton';
import config from '../config/config';
import strings from '../config/strings';
import { toLocalStartOfDayInUtc } from '../model/RepairListFilters';
import { isOnlyUser } from '../permissions';

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  repairsListState: RepairsListShape.isRequired,
  userInfo: UserInfoShape.isRequired,
  filterPanel: FilterPanelShape.isRequired,
  triggerRepairsListFetch: PropTypes.func.isRequired,
  filtersApplied: PropTypes.func.isRequired,
  sortTypeChanged: PropTypes.func.isRequired,
  filtersButtonClicked: PropTypes.func.isRequired,
  onFilterPanelValuesChanged: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  getUsersByName: PropTypes.func.isRequired,
};

export default class RepairsListPage extends Component {
  componentDidMount() {
    this.props.triggerRepairsListFetch(this.props.repairsListState.appliedFilters);
  }

  render() {
    const {
      filterPanel, userInfo, repairsListState, history, onFilterPanelValuesChanged,
      filtersApplied, getUsersByName, onRemoveClick,
    } = this.props;
    const selectedDate = toLocalStartOfDayInUtc(repairsListState.appliedFilters.date)
      .local()
      .format('D MMM');
    return (
      <div style={{ marginBottom: 32 }}>
        <Row>
          <Col xs={12} sm={8} style={{ lineHeight: '34px' }}>
            {isOnlyUser(userInfo)
              ? (
                <h3>{strings.my_repairs_list_for(selectedDate)}</h3>
              )
              : (
                <h3>{strings.repairs_list_for(selectedDate)}</h3>
              )}

          </Col>
          <Col xs={9} sm={3}>
            <FiltersSortTypeSelector
              sortType={repairsListState.sortType}
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
          userInfo={userInfo}
          appliedFilters={repairsListState.appliedFilters}
          filterPanel={filterPanel}
          onFilterPanelValuesChanged={filters => onFilterPanelValuesChanged(filters)}
          onFiltersApplied={filters => filtersApplied(filters)}
          expanded={filterPanel.expanded}
          getUsersByName={getUsersByName}
        />
        <RepairsList
          userInfo={userInfo}
          repairsList={repairsListState.repairs}
          history={history}
          onRemoveClick={repair => onRemoveClick(repair)}
        />
        <div className="text-right">
          <CreateRepairButton
            userInfo={userInfo}
            onClick={() => history.push(config.routes.createRepair.path)}
          />
        </div>
      </div>
    );
  }
}

RepairsListPage.propTypes = propTypes;
