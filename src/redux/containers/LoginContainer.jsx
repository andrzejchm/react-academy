import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../actions/userInfoActions';
import LoginPage from '../../pages/LoginPage';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onSubmit: credentials => dispatch(login(credentials)),
});

const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
export default LoginContainer;
