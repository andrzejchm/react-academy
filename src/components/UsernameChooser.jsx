import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';
import { ControlLabel, FormControl } from 'react-bootstrap';
import strings from '../config/strings';

const propTypes = {
  username: PropTypes.string,
  onUsernameChanged: PropTypes.func.isRequired,
};

const defaultProps = {
  username: '',
};

class UsernameChooser extends Component {
  handleChange(event) {
    this.props.onUsernameChanged(event.target.value);
  }
  render() {
    const { username } = this.props;
    return (
      <span>
        <ControlLabel
          style={{ marginLeft: '16px' }}
        >
          {strings.filter_label_choose_user}
        </ControlLabel>
        <FormControl
          style={{ marginLeft: '6px' }}
          type="text"
          value={username}
          placeholder="Enter text"
          onChange={event => this.handleChange(event)}
        />
      </span>
    );
  }
}

UsernameChooser.propTypes = propTypes;
UsernameChooser.defaultProps = defaultProps;
export default UsernameChooser;
