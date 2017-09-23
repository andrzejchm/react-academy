import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { isAtLeastManager } from '../permissions';
import { UserInfoShape } from '../model/UserInfo';

const propTypes = {
  userInfo: UserInfoShape.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default function CreateRepairButton({ userInfo, onClick }) {
  if (isAtLeastManager(userInfo)) {
    return (
      <Button bsStyle="primary" bsSize="large" onClick={() => onClick()}>
        <Glyphicon glyph="plus" /> Add repair
      </Button>
    );
  }
  return <span />;
}

CreateRepairButton.propTypes = propTypes;
