import React, { Component } from 'react';
import { Grid, Col, Panel } from 'react-bootstrap';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import strings from '../config/strings';
import config from '../config/config';
import LoginForm from '../components/LoginForm';
import { STATUS_SUCCESS } from '../redux/actions/rest_api';
import { UserInfoShape } from '../model/UserInfo';
import { ApiResponseShape } from '../model/ApiResponse';

export default class LoginPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.status === STATUS_SUCCESS) {
      nextProps.history.replace('/repairs');
    }
  }

  render() {
    return (
      <Grid style={{ marginTop: 70 }}>
        <Col xs={12} md={4} mdOffset={4} lg={4} lgOffset={4}>
          <Panel>
            <h2 className="text-center">{strings.login_title}</h2>
            <LoginForm
              onSubmit={credentials => this.props.onSubmit(credentials)}
              userInfo={this.props.userInfo}
            />
          </Panel>
          <div className="text-center">
            {strings.dont_have_account_question}&nbsp;
            <Link to={config.routes.register.path}>{strings.register_button}</Link>
          </div>
        </Col>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userInfo: ApiResponseShape(UserInfoShape).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};
