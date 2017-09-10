import React, { Component } from 'react';
import { Grid, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import strings from '../config/strings';
import RegisterForm from '../components/RegisterForm';
import config from '../config/config';

class RegisterPage extends Component {
  onRegisterClicked(credentials) {
    this.setState({
      username: credentials.username,
      password: credentials.password,
    });
  }

  render() {
    return (
      <Grid className="login-form">
        <Col xs={12} md={4} mdOffset={4} lg={4} lgOffset={4}>
          <Panel>
            <h2 className="text-center">{strings.register_title}</h2>
            <RegisterForm onSubmit={credentials => this.onRegisterClicked(credentials)} />
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
