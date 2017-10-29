import React from 'react';
import {
    Router,
    Route,
    Switch
} from 'react-router';
import browserHistory from './history.jsx';

import Home from '../ui/home/home.jsx';
import Books from '../ui/books/books.jsx';
import Carts from '../ui/carts/carts.jsx';
import Checkout from '../ui/checkout/checkout.jsx';
import SignIn from '../ui/signin/signin.jsx';
import CreateAccount from '../ui/createaccount/createaccount.jsx';
import Profile from '../ui/profile/profile.jsx';
import PageNotFound from '../ui/pagenotfound/pagenotfound.jsx';

export const renderRoutes = () => (
    <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/books" component={Books} />
      <Route path="/signin" component={SignIn} />
      <Route path="/createaccount" component={CreateAccount} />
      <Route path="/profile" component={Profile} />
      <Route path="/carts" component={Carts} />
      <Route path="/checkout" component={Checkout} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);
