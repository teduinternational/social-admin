import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { AddUser } from '../Admin/Users/AddUser';
import { AppState } from '../../store';
import { EditUser } from './Users/EditUser';
import { Home } from './Home/Home';
import { LeftMenu } from './LeftMenu/LeftMenu';
import { TopBar } from './TopBar/TopBar';
import { Users } from './Users/Users';
import { getCurrentLoginUser } from '../../store/account/actions';

export const Admin = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: AppState) => state.alert);
  useEffect(() => {
    dispatch(getCurrentLoginUser());
  }, [dispatch]);

  return (
    <Fragment>
      <LeftMenu />
      {/* Content Wrapper */}
      <div id='content-wrapper' className='d-flex flex-column'>
        {/* Main Content */}
        <div id='content'>
          <TopBar />
          {/* Begin Page Content */}
          <div className='container-fluid'>
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Switch>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/user-add'>
                <AddUser />
              </Route>
              <Route path='/user-edit/:id'>
                <EditUser />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className='sticky-footer bg-white'>
          <div className='container my-auto'>
            <div className='copyright text-center my-auto'>
              <span>Copyright © Your Website 2020</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </Fragment>
  );
};
