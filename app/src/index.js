import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import Store from './store';
import createBrowserHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import './style.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={Store}>
    <Routes history={history} />
  </Provider>,
  document.querySelector('#app')
);

registerServiceWorker();
