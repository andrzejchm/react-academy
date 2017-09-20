import PropTypes from 'prop-types';

export default class User {
  constructor(username, role) {
    this.username = username;
    this.role = role;
  }
}

export const UserShape = PropTypes.shape({
  username: PropTypes.string,
  role: PropTypes.string,
});

export function userFromApiResponse(apiResponse) {
  return new User(apiResponse.username, apiResponse.role);
}
