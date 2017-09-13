import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import LoginForm from '../LoginForm';

it('LoginForm displays correctly', () => {
  const div = document.createElement('div');
  const onSubmit = jest.fn();
  ReactDOM.render(
    <MemoryRouter>
      <LoginForm onSubmit={() => expect(onSubmit).toBeCalled()} userInfo={{}} />
    </MemoryRouter>
    , div);
});
