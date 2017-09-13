import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BrowserApp from './BrowserApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  React.createElement(BrowserApp),
  document.getElementById('root'),
);

registerServiceWorker();
