import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import PrivateRoute from './private';
import GuestRoute from './guest';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Main from '../pages/Main';
import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <GuestRoute path="/signin" component={SignIn} />
      <GuestRoute path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={Main} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
