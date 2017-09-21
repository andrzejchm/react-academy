import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppLayoutContainer from '../redux/containers/AppLayoutContainer';

const propTypes = {
  activeTab: PropTypes.number,
  component: PropTypes.func.isRequired,
  isAccessGranted: PropTypes.func.isRequired,
  redirectOnAccessDenied: PropTypes.string,
  /* eslint-disable */
  wholeState: PropTypes.object.isRequired,
  /* eslint-enable */
};

const defaultProps = {
  activeTab: 0,
  redirectOnAccessDenied: '',
};

function AppLayoutRoute({
  activeTab, component: Component, wholeState, redirectOnAccessDenied, isAccessGranted, ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAccessGranted(wholeState)) {
          return (
            <AppLayoutContainer activeTab={activeTab}>
              <Component {...props} />
            </AppLayoutContainer>);
        }
        return (<Redirect to={redirectOnAccessDenied} {...props} />);
      }}
    />
  );
}

const mapStateToProps = state => ({
  wholeState: state,
});
const AppLayoutRouteContainer = withRouter(
  connect(mapStateToProps)(AppLayoutRoute),
);

AppLayoutRoute.propTypes = propTypes;

AppLayoutRoute.defaultProps = defaultProps;

export default AppLayoutRouteContainer;
