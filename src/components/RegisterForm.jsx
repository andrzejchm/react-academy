import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import strings from '../config/strings';

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
    if (this.state.confirm === this.state.password) {
      this.props.onSubmit({
        username: this.state.username,
        password: this.state.password,
      });
    }
    event.preventDefault();
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

  validation() {
    if (this.state.confirm !== this.state.password && this.state.confirm) {
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
          validationState={this.validation()}
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
        </FormGroup>
        <Button
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
};

export default RegisterForm;
