import './App.css';
import './styles/sb-admin-2.min.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { AccountRoute } from './components/AccountRoute';
import { Admin } from './pages/Admin/Admin';
import { Login } from './pages/Account';
import { PrivateRoute } from './components';
import React from 'react';

function App() {
  return (
    <div className='App' id='wrapper'>
      <Router>
        <Switch>
          <AccountRoute>
            <Login />
          </AccountRoute>
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
