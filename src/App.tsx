import './App.css';
import './styles/sb-admin-2.min.css';
import './assets/font-awesome/css/all.min.css';

import { Route, Router, Switch } from 'react-router-dom';

import { Admin } from './pages/Admin/Admin';
import { Login } from './pages/Account';
import { PrivateRoute } from './components';
import React from 'react';
import { history } from './helpers';

function App() {
  return (
    <div className='App' id='wrapper'>
      <Router history={history}>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/'>
            <Admin />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
