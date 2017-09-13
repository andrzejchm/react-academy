import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Grid, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import strings from '../config/strings';
import RegisterForm from '../components/RegisterForm';
import config from '../config/config';
import { STATUS_SUCCESS } from '../redux/actions/rest_api';
import { UserInfoShape } from '../data/UserInfo';

class RegisterPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.status === STATUS_SUCCESS) {
      nextProps.history.replace('/repairs');
    }
  }

  render() {
    return (
      <Grid className="login-form">
        <Col xs={12} md={4} mdOffset={4} lg={4} lgOffset={4}>
          <Panel>
            <h2 className="text-center">{strings.register_title}</h2>
            <RegisterForm
              onSubmit={this.props.onSubmit}
              userInfo={this.props.userInfo}
              history={this.props.history}
            />
          </Panel>
          <div className="text-center">
            {strings.already_have_account_question}&nbsp;
            <Link to={config.routes.login.path}>{strings.login_button}</Link>
          </div>
        </Col>
      </Grid>
    );
  }
}

export default RegisterPage;

RegisterPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userInfo: UserInfoShape.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};
