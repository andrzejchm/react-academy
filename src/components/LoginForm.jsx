import React, { Component } from 'react';
import { FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import PropTypes from 'prop-types';
import strings from '../config/strings';
import { STATUS_ERROR, STATUS_LOADING } from '../redux/actions/rest_api';
import { UserInfoShape } from '../model/UserInfo';
import { ApiResponseShape } from '../model/ApiResponse';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
    };
  }


  onSubmit(event) {
    event.preventDefault();
    if (this.isFormValid()) {
      this.props.onSubmit({
        username: this.state.username,
        password: this.state.password,
      });
    }
  }

  passwordChanged(event) {
    this.setState({ password: event.target.value });
  }

  usernameChanged(event) {
    this.setState({ username: event.target.value });
  }

  formValidation() {
    if (this.state.password.length < 3 && this.state.password.length > 0) {
      return 'error';
    }
    return null;
  }

  postRequestValidation() {
    if (this.props.userInfo.status === STATUS_ERROR) {
      return 'error';
    }
    return null;
  }

  isFormValid() {
    return !this.formValidation();
  }

  render() {
    return (
      <form>
        <FormGroup
          validationState={this.formValidation() || this.postRequestValidation()}
        >
          <FormControl
            type="text"
            value={this.state.username}
            placeholder={strings.username_hint}
            onChange={event => this.usernameChanged(event)}
          />
          <p />
          <FormControl
            type="password"
            value={this.state.password}
            onChange={event => this.passwordChanged(event)}
            placeholder={strings.password_hint}
          />
          {this.props.userInfo.status === STATUS_ERROR
            ? <HelpBlock>{this.props.userInfo.error.message}</HelpBlock>
            : <span />
          }
        </FormGroup>
        <Button
          disabled={this.props.userInfo.status === STATUS_LOADING}
          block
          className="pull-right"
          bsStyle="primary"
          onClick={event => this.onSubmit(event)}
          type="submit"
        >Submit</Button>
      </form>

    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userInfo: ApiResponseShape(UserInfoShape).isRequired,
};

LoginForm.defaultProps = {
  error: null,
};

export default LoginForm;
