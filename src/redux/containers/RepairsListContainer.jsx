import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { filtersApplied, sortTypeChanged, triggerRepairsListFetch } from '../../usecases/repairsListDuck';
import RepairsListPage from '../../pages/RepairsListPage';
import { toggleFiltersVisibility, filterPanelValuesChanged } from '../../usecases/repairsFiltersPanelDuck';

const mapStateToProps = state => ({
  repairsList: state.repairsList,
  filterPanel: state.repairsFiltersPanel,
});

const mapDispatchToProps = dispatch => ({
  triggerRepairsListFetch: () => dispatch(triggerRepairsListFetch()),
  filtersApplied: filters => dispatch(filtersApplied(filters)),
  filtersButtonClicked: () => dispatch(toggleFiltersVisibility()),
  sortTypeChanged: sortType => dispatch(sortTypeChanged(sortType)),
  onFilterPanelValuesChanged: filterPanelValues =>
    dispatch(filterPanelValuesChanged(filterPanelValues)),
});

const RepairsListContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RepairsListPage),
);

export default RepairsListContainer;
