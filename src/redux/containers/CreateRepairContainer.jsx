import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsersByNameAction, onUserSelectedAction, onTimeSelectedAction,
  onDateChangedAction } from '../../usecases/createRepairDuck';
import CreateRepairPage from '../../pages/CreateRepairPage';

const mapStateToProps = state => ({
  createRepairState: state.createRepair,
});

const mapDispatchToProps = dispatch => ({
  onDateChanged: date => dispatch(onDateChangedAction(date)),
  getUsersByName: name => dispatch(getUsersByNameAction(name)),
  onUserSelected: user => dispatch(onUserSelectedAction(user)),
  onTimeSelected: hour => dispatch(onTimeSelectedAction(hour)),
});

const CreateRepairContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateRepairPage));

export default CreateRepairContainer;
