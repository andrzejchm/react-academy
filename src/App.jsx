import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history, configureStore } from './redux/store';
import AppLayoutRoute from './components/AppLayoutRoute';
import LoginContainer from './redux/containers/LoginContainer';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import RepairsListPage from './pages/RepairsListPage';
import RepairDetailsPage from './pages/RepairDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import config from './config/config';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
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
            component={LoginContainer}
          />
          <Route
            {...config.routes.register}
            component={RegisterPage}
          />
          <AppLayoutRoute component={NotFoundPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

