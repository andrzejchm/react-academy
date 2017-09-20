import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRepairsListWithFilters, toggleFiltersVisibility } from '../../usecases/repairsUseCases';
import RepairsListPage from '../../pages/RepairsListPage';

const mapStateToProps = state => ({
  repairsList: state.repairsList,
});

const mapDispatchToProps = dispatch => ({
  getRepairsList: filters => dispatch(getRepairsListWithFilters(filters)),
  filtersButtonClicked: () => dispatch(toggleFiltersVisibility()),
});

const RepairsListContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RepairsListPage),
);

export default RepairsListContainer;
