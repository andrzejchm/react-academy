import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AppLayoutRoute from './components/AppLayoutRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import RepairsListPage from './pages/RepairsListPage';
import RepairDetailsPage from './pages/RepairDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import config from './config/config';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to={config.routes.repairs.path} />
        <AppLayoutRoute
          {...config.routes.repairs}
          component={RepairsListPage}
        />
        <AppLayoutRoute
          {...config.routes.repairDetails}
          component={RepairDetailsPage}
        />
        <AppLayoutRoute
          {...config.routes.users}
          activeTab={2}
          component={UsersPage}
        />
        <Route
          {...config.routes.login}
          component={LoginPage}
        />
        <Route
          {...config.routes.register}
          component={RegisterPage}
        />
        <AppLayoutRoute component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

