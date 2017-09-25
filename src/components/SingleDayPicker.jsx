import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import MomentPropTypes from 'react-moment-proptypes';
import {
  getTodayUtcStart, toLocalStartOfDayInUtc,
} from '../model/RepairListFilters';

const propTypes = {
  date: MomentPropTypes.momentObj,
  onDayChanged: PropTypes.func.isRequired,
};

const defaultProps = {
  date: getTodayUtcStart(),
};

export default class SingleDayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  onFocusChange(focused) {
    if (focused !== this.state.focused) {
      this.setState({ focused });
    }
  }

  dateChanged(date) {
    if (date !== this.state.date) {
      this.setState({ date });
      this.props.onDayChanged(toLocalStartOfDayInUtc(date.local()));
    }
  }

  render() {
    return (
      <span>
        <SingleDatePicker
          date={moment(this.props.date).local()}
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
