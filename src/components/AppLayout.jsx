import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Grid } from 'react-bootstrap';
import Navigation from './Navigation';
import { UserInfoShape } from '../model/UserInfo';
import PageBreadcrumb from './PageBreadcrumb';

export default function AppLayout({ activeTab, onLogout, children, userInfo, history, match }) {
  return (
    <div>
      <Navigation activeTab={activeTab} onLogout={onLogout} userInfo={userInfo} history={history} />
      <PageBreadcrumb match={match} />
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
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  userInfo: UserInfoShape,
};

AppLayout.defaultProps = {
  children: null,
  activeTab: 0,
  userInfo: null,
};
