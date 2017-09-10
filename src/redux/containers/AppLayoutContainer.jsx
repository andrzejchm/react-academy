import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/userInfoActions';
import AppLayout from '../../components/AppLayout';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  },
});

const AppLayoutContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayout));
export default AppLayoutContainer;
