import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Panel } from 'react-bootstrap';

export default function ErrorMessage({ info }) {
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

ErrorMessage.propTypes = {
  info: PropTypes.string,
};

ErrorMessage.defaultProps = {
  info: null,
};
