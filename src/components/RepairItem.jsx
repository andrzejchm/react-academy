import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { Image, Media } from 'react-bootstrap';
import globalStyles from '../config/styles';
import { RepairShape } from '../model/Repair';


const RepairItem = Radium(({ repair, onClick }) => (
  <div
    onClick={() => onClick()}
    role="button"
    tabIndex={0}
    style={globalStyles.clickableListElement}
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
        <p>
          <small>
            {repair.dateTime.fromNow()}
          </small>
        </p>
      </Media.Body>
      <Media.Right>
        {repair.dateTime.format('HH:mm')}
      </Media.Right>
    </Media>
  </div>
));

RepairItem.propTypes = {
  repair: RepairShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RepairItem;
