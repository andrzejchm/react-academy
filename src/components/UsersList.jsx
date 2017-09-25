import { Button, Col, Glyphicon, Image, Media, Panel } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';
import { UserShape } from '../model/User';
import { isAtLeastAdmin } from '../permissions';
import { UserInfoShape } from '../model/UserInfo';

const propTypes = {
  onRemoveUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserShape).isRequired,
  userInfo: UserInfoShape.isRequired,
};

const defaultProps = {
};

function shouldShowRemoveButton(userInfo, user) {
  return isAtLeastAdmin(userInfo) && userInfo.username !== user.username
}

function UsersList({ users, userInfo, onRemoveUser }) {
  return (
    <div>
      {users && users.length ? users.map(user => (
        <Panel>
          <Media>
            <Media.Left>
              <Image
                style={{ width: 32, height: 32, marginRight: 8 }}
                src="default_avatar.png"
                circle
              />
            </Media.Left>
            <Media.Body>
              {user.username}
            </Media.Body>
            <Media.Right>
              {user.role}
              {shouldShowRemoveButton(userInfo, user) && (
                <span>
                  <Button
                    bsStyle="link"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                      onRemoveUser(user);
                    }}
                  >
                    <Glyphicon glyph="remove" />
                  </Button>
                </span>
              )}
            </Media.Right>
          </Media>
        </Panel>
      ))
        : <Panel> <p>there are no users</p></Panel>}
    </div>
  );
}

UsersList.propTypes = propTypes;
UsersList.defaultProps = defaultProps;
export default UsersList;
