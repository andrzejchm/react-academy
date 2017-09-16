import PropTypes from 'prop-types';

export default class Repair {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export const RepairShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});
