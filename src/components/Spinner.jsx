import React from 'react';
import SpinKitSpinner from 'react-spinkit';
import { Col, Grid } from 'react-bootstrap';

export default function Spinner() {
  return (
    <Grid>
      <Col xs={12} className="text-center" style={{ marginTop: 32 }}>
        <SpinKitSpinner name="line-scale" fadeIn="half" />
      </Col>
    </Grid>
  );
}
