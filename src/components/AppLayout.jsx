import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import Navigation from './Navigation';

export default function AppLayout({ isLoggedIn, activeTab, children }) {
  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} activeTab={activeTab} />
      <div>
        <Grid>
          {children}
        </Grid>
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.node,
  activeTab: PropTypes.number,
};

AppLayout.defaultProps = {
  children: null,
  isLoggedIn: false,
  activeTab: 0,
};
