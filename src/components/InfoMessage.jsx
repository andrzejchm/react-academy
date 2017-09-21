import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Panel } from 'react-bootstrap';

const propTypes = {
  info: PropTypes.string,
};

const defaultProps = {
  info: null,
};

export default function InfoMessage({ info }) {
  if (info && info.length) {
    return (
      <Grid>
        <Col xs={8} xsOffset={2} className="text-center" style={{ marginTop: 32 }}>
          <Panel bsStyle="info">
            {info}
          </Panel>
        </Col>
      </Grid>
    );
  }
  return <span />;
}

InfoMessage.propTypes = propTypes;

InfoMessage.defaultProps = defaultProps;
