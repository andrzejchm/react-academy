import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import strings from '../config/strings';

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
    if (this.isFormValid()) {
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

  usernameChanged(event) {
    this.setState({ username: event.target.value });
  }

  validation() {
    if (this.state.password.length < 3) {
      return 'error';
    }
    return null;
  }
  isFormValid() {
    return !this.validation();
  }

  render() {
    return (
      <form>
        <FormGroup
          validationState={this.validation()}
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
