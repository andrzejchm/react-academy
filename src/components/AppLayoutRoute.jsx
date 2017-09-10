import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppLayoutContainer from '../redux/containers/AppLayoutContainer';

export default function AppLayoutRoute({ activeTab, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <AppLayoutContainer activeTab={activeTab}><Component {...props} /></AppLayoutContainer>
      )}
    />
  );
}

AppLayoutRoute.propTypes = {
  activeTab: PropTypes.number,
  component: PropTypes.func.isRequired,
};

AppLayoutRoute.defaultProps = {
  activeTab: 0,
};
