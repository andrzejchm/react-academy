import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UsersListPage from '../../pages/UsersListPage';
import { getUsersAction, removeUserAction } from '../../usecases/usersListDuck';

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  usersListState: state.usersList,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersAction()),
  removeUserClicked: user => dispatch(removeUserAction(user)),
});

const UsersListContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersListPage));

export default UsersListContainer;
