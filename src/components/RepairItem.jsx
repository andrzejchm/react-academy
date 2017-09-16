import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';
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
        <div style={{ backgroundColor: '#1ab190', width: 32, height: 32 }} />
      </Media.Left>

      <Media.Body>
        <Media.Heading>{repair.name}</Media.Heading>
        <p>smaller text lol</p>
      </Media.Body>
      <Media.Right>
        <div style={{ backgroundColor: '#ff0f90', width: 128, height: 64 }} >text here</div>
      </Media.Right>
    </Media>
  </div>
));

RepairItem.propTypes = {
  repair: RepairShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RepairItem;
