import './App.css';
import './styles/sb-admin-2.min.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { AccountRoute } from './components/AccountRoute';
import { Admin } from './pages/Admin/Admin';
import { Login } from './pages/Account/Login';
import { PrivateRoute } from './components/PrivateRoute';
import React from 'react';

function App() {
  return (
    <div className='App' id='wrapper'>
      <Router>
        <Switch>
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
          <AccountRoute>
            <Login />
          </AccountRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
