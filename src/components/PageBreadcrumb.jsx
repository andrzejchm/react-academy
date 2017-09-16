import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Breadcrumb, Col, Glyphicon, Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PageBreadcrumb({ match }) {
  const names = match.url.split('/').filter(item => item.length);
  const paths = [];
  names.reduce((prev, cur, i) => paths[i] = `${prev}/${cur}`, '');
  const pairs = names.map((name, i) => ({ name, path: paths[i] }));
  console.log(pairs);

  return (
    <div>
      <Grid>
        <Col xs={12}>
          <Breadcrumb style={{ marginBottom: 0, backgroundColor: 'transparent' }}>
            <li><Link to="/"><Glyphicon glyph="home" /></Link></li>
            {pairs.map(item => <li><Link to={item.path}>{item.name}</Link></li>)}
          </Breadcrumb>
        </Col>
      </Grid>
    </div>
  );
}

PageBreadcrumb.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};
