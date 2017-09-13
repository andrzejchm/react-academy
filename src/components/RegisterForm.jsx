import React, { Component } from 'react';
import { FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import PropTypes from 'prop-types';
import strings from '../config/strings';
import { STATUS_ERROR, STATUS_LOADING } from '../redux/actions/rest_api';
import { UserInfoShape } from '../data/UserInfo';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
    };
  }

  onSubmit(event) {
    if (this.isFormValid()) {
      this.props.onSubmit({
        username: this.state.username,
        password: this.state.password,
      });
    }
    event.preventDefault();
  }

  isFormValid() {
    return this.formValidation() === null;
  }
  formValidation() {
    if (this.state.confirm !== this.state.password && this.state.confirm) {
      return 'error';
    }
    return null;
  }

  passwordChanged(event) {
    this.setState({ password: event.target.value });
  }

  confirmChanged(event) {
    this.setState({ confirm: event.target.value });
  }

  usernameChanged(event) {
    this.setState({ username: event.target.value });
  }

  postRequestValidation() {
    if (this.props.userInfo.status === STATUS_ERROR) {
      return 'error';
    }
    return null;
  }


  render() {
    return (
      <form>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder={strings.username_hint}
            onChange={event => this.usernameChanged(event)}
          />
        </FormGroup>
        <FormGroup
          validationState={this.formValidation() || this.postRequestValidation()}
        >
          <FormControl
            type="password"
            value={this.state.password}
            onChange={event => this.passwordChanged(event)}
            placeholder={strings.password_hint}
          />
          <p />
          <FormControl
            type="password"
            value={this.state.confirm}
            onChange={event => this.confirmChanged(event)}
            placeholder={strings.confirm_password_hint}
          />
          <FormControl.Feedback />
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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userInfo: UserInfoShape.isRequired,
};

export default RegisterForm;
