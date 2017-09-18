import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

export default class Repair {
  constructor(id, name, dateTimeString) {
    this.id = id;
    this.name = name;
    this.dateTime = moment(dateTimeString);
  }
}

export const RepairShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  dateTime: MomentPropTypes.momentObj,
});
