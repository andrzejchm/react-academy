import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Panel } from 'react-bootstrap';

export default function ErrorMessage({ error }) {
  if (error && error.message && error.message.length) {
    return (
      <Grid>
        <Col xs={8} xsOffset={2} className="text-center" style={{ marginTop: 32 }}>
          <Panel bsStyle="danger">
            {error.message}
          </Panel>
        </Col>
      </Grid>
    );
  }
  return <span />;
}

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    code: PropTypes.number,
  }),
};

ErrorMessage.defaultProps = {
  error: {
    message: null,
    code: 0,
  },
};
