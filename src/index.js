import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BrowserApp from './BrowserApp';
import registerServiceWorker from './registerServiceWorker';

BrowserApp((Component) => {
  ReactDOM.render(
    React.createElement(Component),
    document.getElementById('root'),
  );
});

registerServiceWorker();
