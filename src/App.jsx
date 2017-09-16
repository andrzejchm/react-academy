import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayoutRoute from './components/AppLayoutRoute';
import LoginContainer from './redux/containers/LoginContainer';
import UsersPage from './pages/UsersPage';
import RepairsListPage from './pages/RepairsListPage';
import RepairDetailsPage from './pages/RepairDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import config from './config/config';
import RegisterContainer from './redux/containers/RegisterContainer';

export default function App() {
  return (
    <Switch>
      <Redirect exact from="/" to={config.routes.repairs.path} />
      <AppLayoutRoute
        exact
        {...config.routes.repairs}
        component={RepairsListPage}
      />
      <AppLayoutRoute
        {...config.routes.repairDetails(':id')}
        component={RepairDetailsPage}
      />
      <AppLayoutRoute
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
      <AppLayoutRoute component={NotFoundPage} />
    </Switch>
  );
}

