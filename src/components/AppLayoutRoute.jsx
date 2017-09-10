import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from './AppLayout';

export default function AppLayoutRoute({activeTab, component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => (
        <AppLayout activeTab={activeTab}><Component {...props} /></AppLayout>
      )}
    />
  );
}
