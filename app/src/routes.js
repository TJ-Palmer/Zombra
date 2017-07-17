import React from 'react';
import { Router, Route, Switch } from 'react-router';
import './style.css';

import Home from './views/home';

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default Routes;
