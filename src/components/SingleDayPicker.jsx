import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import MomentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { ControlLabel } from 'react-bootstrap';
import strings from '../config/strings';

const propTypes = {
  startDate: MomentPropTypes.momentObj,
  onDayChanged: PropTypes.func.isRequired,
};

const defaultProps = {
  startDate: moment().startOf('day'),
};

export default class SingleDayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: props.startDate,
    };
  }

  onFocusChange(focused) {
    this.setState({ focused });
  }

  dateChanged(date) {
    this.setState({ date });
    this.props.onDayChanged(moment(date).startOf('day'), moment(date).endOf('day'));
  }

  render() {
    return (
      <span>
        <SingleDatePicker
          date={this.state.date}
          keepOpenOnDateSelect={false}
          focused={this.state.focused}
          numberOfMonths={1}
          displayFormat="MMM D"
          isOutsideRange={() => false}
          onFocusChange={({ focused }) => this.onFocusChange(focused)}
          onDateChange={date => this.dateChanged(date)}
        />
      </span>);
  }
}

SingleDayPicker.propTypes = propTypes;

SingleDayPicker.defaultProps = defaultProps;
