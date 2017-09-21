import PropTypes from 'prop-types';

export const USER_ROLE_MANAGER = 'manager';
export const USER_ROLE_USER = 'user';

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
