import React from 'react';
import { Grid, Col, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import strings from '../config/strings';
import config from '../config/config';
import LoginForm from '../components/LoginForm';

export default function LoginPage({ onSubmit, history }) {
  function onLoginClicked(credentials) {
    onSubmit(credentials);
    history.replace('/');
  }

  return (
    <Grid className="login-form">
      <Col xs={12} md={4} mdOffset={4} lg={4} lgOffset={4}>
        <Panel>
          <h2 className="text-center">{strings.login_title}</h2>
          <LoginForm onSubmit={credentials => onLoginClicked(credentials)} />
        </Panel>
        <div className="text-center">
          {strings.dont_have_account_question}&nbsp;
          <Link to={config.routes.register.path}>{strings.register_button}</Link>
        </div>
      </Col>
    </Grid>
  );
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
