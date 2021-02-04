import { Route, RouteProps } from 'react-router-dom';

import { Login } from '../pages/Account/Login';
import React from 'react';

export const PrivateRoute = ({
  children,
  ...rest
}: RouteProps): JSX.Element => {
  return <Route {...rest} render={() => (true ? children : <Login />)}></Route>;
};
