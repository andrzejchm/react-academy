import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayoutRoute from './components/AppLayoutRoute';
import LoginContainer from './redux/containers/LoginContainer';
import UsersPage from './pages/UsersPage';
import RepairDetailsPage from './pages/RepairDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import config from './config/config';
import RegisterContainer from './redux/containers/RegisterContainer';
import RepairsListContainer from './redux/containers/RepairsListContainer';
import { isAtLeastManager, isLoggedIn } from './permissions';
import CreateRepairContainer from './redux/containers/CreateRepairContainer';

export default function App() {
  return (
    <Switch>
      <Redirect exact from="/" to={config.routes.repairs.path} />
      <AppLayoutRoute
        isAccessGranted={isLoggedIn}
        redirectOnAccessDenied={config.routes.login.path}
        exact
        {...config.routes.repairs}
        component={RepairsListContainer}
      />
      <AppLayoutRoute
        isAccessGranted={isAtLeastManager}
        redirectOnAccessDenied={config.routes.accessDenied.path}
        exact
        {...config.routes.createRepair}
        component={CreateRepairContainer}
      />
      <AppLayoutRoute
        isAccessGranted={isLoggedIn}
        redirectOnAccessDenied={config.routes.login.path}
        {...config.routes.repairDetails(':id')}
        component={RepairDetailsPage}
      />
      <AppLayoutRoute
        isAccessGranted={isAtLeastManager}
        redirectOnAccessDenied={config.routes.login.path}
        {...config.routes.users}
        activeTab={2}
        component={UsersPage}
      />
      <Route
        {...config.routes.login}
        component={LoginContainer}
      />
      <Route
        {...config.routes.register}
        component={RegisterContainer}
      />
      <Route
        isAccessGranted={() => true}
        component={NotFoundPage}
      />
    </Switch>
  );
}

