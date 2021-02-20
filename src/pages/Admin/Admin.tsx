import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router';

import { Home } from './Home/Home';
import { LeftMenu } from './LeftMenu/LeftMenu';
import { TopBar } from './TopBar/TopBar';
import { Users } from './Users/Users';
import { getCurrentLoginUser } from '../../store/account/actions';
import { useDispatch } from 'react-redux';

export const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentLoginUser());
  }, []);

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
            <Switch>
              <Route path={`/users`}>
                <Users />
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
