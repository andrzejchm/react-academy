import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

export default function FilterButton({ isPressed, onClick }) {
  return (<Button active={isPressed} onClick={() => onClick()} block>
    <Glyphicon glyph="filter" />
  </Button>);
}

FilterButton.propTypes = {
  isPressed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

