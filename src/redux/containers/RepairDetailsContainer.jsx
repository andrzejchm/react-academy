import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RepairDetailsPage from '../../pages/RepairDetailsPage';
import { loadRepairDetailsAction, onRemoveClickedAction } from '../../usecases/repairDetailsDuck';

const mapStateToProps = state => ({
  repairDetailsState: state.repairDetails,
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = dispatch => ({
  loadRepairDetails: id => dispatch(loadRepairDetailsAction(id)),
  onRemoveClicked: () => dispatch(onRemoveClickedAction()),
});

const RepairDetailsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RepairDetailsPage));

export default RepairDetailsContainer;
