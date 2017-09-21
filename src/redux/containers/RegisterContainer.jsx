import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register } from '../../usecases/authDuck';
import RegisterPage from '../../pages/RegisterPage';

const mapStateToProps = state => ({
  userInfo: state.auth,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: credentials => dispatch(register(credentials)),
});

const RegisterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
export default RegisterContainer;
