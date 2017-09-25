import React, { Component } from 'react';
import { Col, Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UsersList from '../components/UsersList';
import { UserInfoShape } from '../model/UserInfo';
import strings from '../config/strings';
import { UsersListPropType } from '../usecases/usersListDuck';
import { STATUS_NONE } from '../redux/actions/rest_api';

const propTypes = {
  getUsers: PropTypes.func.isRequired,
  removeUserClicked: PropTypes.func.isRequired,
  userInfo: UserInfoShape.isRequired,
  usersListState: UsersListPropType.isRequired,
};

const defaultProps = {

};

export default class UsersListPage extends Component {
  componentDidMount() {
    const { usersListState, getUsers } = this.props;
    if (usersListState.list.status === STATUS_NONE) {
      getUsers();
    }
  }

  render() {
    const {
      userInfo,
      usersListState,
      removeUserClicked,
    } = this.props;
    return (
      <Grid>
        <Col xs={10} xsPush={1}>
          <h3 style={{ marginBottom: 32 }}>{strings.users_title}</h3>
          <UsersList
            userInfo={userInfo}
            users={usersListState.list.payload}
            onRemoveUser={user => removeUserClicked(user)}
          />
        </Col>
      </Grid>
    );
  }
}

UsersListPage.propTypes = propTypes;
UsersListPage.defaultProps = defaultProps;
