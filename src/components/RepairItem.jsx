import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Image, Media } from 'react-bootstrap';
import globalStyles from '../config/styles';
import { RepairShape } from '../model/Repair';
import UserInfo from '../model/UserInfo';
import { isAtLeastManager } from '../permissions';

require('moment-duration-format');

const propTypes = {
  repair: RepairShape.isRequired,
  userInfo: UserInfo.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired,
};

const RepairItem = Radium(({ userInfo, repair, onClick, onRemoveClicked }) => (
  <div
    onClick={() => onClick()}
    role="button"
    tabIndex={0}
    style={repair.isCompleted
      ? globalStyles.clickableListElementCompleted
      : globalStyles.clickableListElement
    }
  >
    <Media>
      <Media.Left>
        <Image style={{ width: 32, height: 32 }} src="default_avatar.png" circle />
      </Media.Left>

      <Media.Body>
        <Media.Heading>
          <b>
            {repair.name}
          </b>
        </Media.Heading>
        <small>assigned to: {repair.assignedUser.username}</small>
        <p>
          {!repair.isCompleted
            ? <span />
            : <small style={{ lineHeight: '18px' }}>
              Completed
              <Image
                style={{ width: 14, height: 14, marginLeft: 8 }}
                src="green_check.png"
                circle
              />
            </small>}
        </p>
      </Media.Body>
      <Media.Right>
        <div style={{ width: 200 }} className="text-right">
          <small>{repair.startDate.format('HH:mm')}&nbsp;- &nbsp;{repair.endDate.format('HH:mm')}</small>
          {isAtLeastManager(userInfo) && (
            <Button
              bsStyle="link"
              style={{ marginLeft: 16 }}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveClicked();
              }}
            >
              <Glyphicon glyph="remove" />
            </Button>)}
        </div>
      </Media.Right>
    </Media>
  </div>
));

RepairItem.propTypes = propTypes;

export default RepairItem;
