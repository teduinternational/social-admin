import { Redirect, Route, RouteProps } from 'react-router';

import { AccountState } from '../store/account/types';
import { AppState } from '../store';
import { Login } from '../pages/Account/Login';
import React from 'react';
import { useSelector } from 'react-redux';

export const AccountRoute = ({
  children,
  ...rest
}: RouteProps): JSX.Element => {
  const account: AccountState = useSelector((state: AppState) => state.account);

  return (
    <Route
      {...rest}
      render={() =>
        account.token ? (
          <Redirect
            to={{
              pathname: '/admin/home',
            }}
          />
        ) : (
          <Login />
        )
      }
    />
  );
};
