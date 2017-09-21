import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../usecases/authDuck';
import LoginPage from '../../pages/LoginPage';

const mapStateToProps = state => ({
  userInfo: state.auth,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: credentials => dispatch(login(credentials)),
});

const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
export default LoginContainer;
