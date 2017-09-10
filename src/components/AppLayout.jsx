import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import Navigation from './Navigation';

export default function AppLayout({ activeTab, onLogout, children, userInfo, ...rest }) {
  return (
    <div>
      <Navigation activeTab={activeTab} onLogout={onLogout} userInfo={userInfo} {...rest} />
      <div>
        <Grid>
          {children}
        </Grid>
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
  activeTab: PropTypes.number,
  onLogout: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    authToken: PropTypes.string,
  }),
};

AppLayout.defaultProps = {
  children: null,
  activeTab: 0,
  userInfo: null,
};
