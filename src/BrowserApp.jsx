import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history, configureStore } from './redux/store';
import App from './App';

export default function BrowserApp() {
  return (
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
}

