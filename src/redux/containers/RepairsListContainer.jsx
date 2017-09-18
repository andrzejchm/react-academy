import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRepairsListForToday } from '../../usecases/repairsUseCases';
import RepairsListPage from '../../pages/RepairsListPage';

const mapStateToProps = state => ({
  repairsList: state.repairsList,
});

const mapDispatchToProps = dispatch => ({
  getRepairsList: () => dispatch(getRepairsListForToday()),
});

const RepairsListContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RepairsListPage),
);

export default RepairsListContainer;
