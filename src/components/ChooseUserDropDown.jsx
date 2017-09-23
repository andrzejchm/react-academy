import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { STATUS_LOADING, STATUS_NONE } from '../redux/actions/rest_api';
import { ApiResponseShape } from '../model/ApiResponse';
import { UserShape } from '../model/User';

const propTypes = {
  users: ApiResponseShape(PropTypes.arrayOf(UserShape)).isRequired,
  selectedUser: UserShape,
  getUsersByName: PropTypes.func.isRequired,
  onUserSelected: PropTypes.func.isRequired,
};

const defaultProps = {
  selectedUser: null,
};

let inputChangeTimeout = null;

function onInputChange(getUsersByName, value) {
  if (!value) {
    return value;
  }
  if (inputChangeTimeout) {
    clearTimeout(inputChangeTimeout);
  }
  inputChangeTimeout = setTimeout(() => getUsersByName(value), 400);
  return value;
}

function userOptions(users) {
  if (users.payload) {
    return users.payload.map(elem => ({ user: elem, value: elem.username, label: elem.username }));
  }
  return [];
}

export default function ChooseUserDropDown({
  selectedUser, users, getUsersByName, onUserSelected,
}) {
  if (users.status === STATUS_NONE) {
    getUsersByName('');
  }
  function userSelected(val) {
    getUsersByName('');
    onUserSelected(val ? val.user : null);
  }

  return (
    <Select
      onInputChange={value => onInputChange(getUsersByName, value)}
      isLoading={users.status === STATUS_LOADING}
      options={userOptions(users)}
      value={selectedUser ? selectedUser.username : null}
      onChange={val => userSelected(val)}
    />
  );
}

ChooseUserDropDown.propTypes = propTypes;
ChooseUserDropDown.defaultProps = defaultProps;
