import PropTypes from 'prop-types';

export default class UserInfo {
  constructor(username, token, role) {
    this.username = username;
    this.token = token;
    this.role = role;
  }
}

export const UserInfoShape = PropTypes.shape({
  username: PropTypes.string,
  token: PropTypes.string,
  role: PropTypes.string,
});
