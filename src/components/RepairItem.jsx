import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Image, Media } from 'react-bootstrap';
import globalStyles from '../config/styles';
import { RepairShape } from '../model/Repair';

require('moment-duration-format');

const RepairItem = Radium(({ repair, onClick }) => (
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
        <p>
          {!repair.isCompleted
            ? <small>{repair.startDate.fromNow()}</small>
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
        <small>{repair.startDate.format('HH:mm')}&nbsp;({moment.duration(repair.endDate.diff(repair.startDate)).format()})</small>
      </Media.Right>
    </Media>
  </div>
));

RepairItem.propTypes = {
  repair: RepairShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RepairItem;
