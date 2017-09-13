import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureTestStore from '../redux/__tests__/store.test';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={configureTestStore()}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
    , div);
});
