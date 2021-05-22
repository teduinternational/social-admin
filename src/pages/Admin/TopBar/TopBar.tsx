import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { AuthenticatedUser } from '../../../store/account/types';
import { INotification } from '../../../store/notification/types';
import { logout } from '../../../store/account/actions';
import { markAsRead } from '../../../store/notification/actions';

export const TopBar = () => {
  const [isShowProfileDropdown, setIsShowProfileDropdown] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const notifications = useSelector(
    (state: AppState) => state.notification.items
  );
  const readCount = notifications.filter((item) => item.read === false).length;
  const dispatch = useDispatch();

  const markNotificationAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const user = useSelector<AppState>(
    (state) => state.account.user
  ) as AuthenticatedUser;

  const notificationElements: JSX.Element[] = notifications.map(
    (item: INotification) => {
      return (
        <a
          key={item._id}
          className='dropdown-item d-flex align-items-center'
          onClick={() => markNotificationAsRead(item._id)}
        >
          <div className='mr-3'>
            <div className='icon-circle bg-primary'>
              <i className='fas fa-file-alt text-white' />
            </div>
          </div>
          <div>
            <div className='small text-gray-500'>{item.date}</div>
            <span className='font-weight-bold'>{item.message}</span>
          </div>
        </a>
      );
    }
  );
  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      {/* Sidebar Toggle (Topbar) */}
      <button
        id='sidebarToggleTop'
        className='btn btn-link d-md-none rounded-circle mr-3'
      >
        <i className='fa fa-bars' />
      </button>
      {/* Topbar Search */}
      <form className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search'>
        <div className='input-group'>
          <input
            type='text'
            className='form-control bg-light border-0 small'
            placeholder='Search for...'
            aria-label='Search'
            aria-describedby='basic-addon2'
          />
          <div className='input-group-append'>
            <button className='btn btn-primary' type='button'>
              <i className='fas fa-search fa-sm' />
            </button>
          </div>
        </div>
      </form>
      {/* Topbar Navbar */}
      <ul className='navbar-nav ml-auto'>
        {/* Nav Item - Search Dropdown (Visible Only XS) */}
        <li className='nav-item dropdown no-arrow d-sm-none'>
          <a
            className='nav-link dropdown-toggle'
            href='/#'
            id='searchDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i className='fas fa-search fa-fw' />
          </a>
          {/* Dropdown - Messages */}
          <div
            className='dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in'
            aria-labelledby='searchDropdown'
          >
            <form className='form-inline mr-auto w-100 navbar-search'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control bg-light border-0 small'
                  placeholder='Search for...'
                  aria-label='Search'
                  aria-describedby='basic-addon2'
                />
                <div className='input-group-append'>
                  <button className='btn btn-primary' type='button'>
                    <i className='fas fa-search fa-sm' />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
        {/* Nav Item - Alerts */}
        <li
          className={
            'nav-item dropdown no-arrow mx-1' +
            (isShowNotification ? ' show' : '')
          }
        >
          <a
            className='nav-link dropdown-toggle'
            id='alertsDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded={isShowNotification ? 'true' : 'false'}
            onClick={() => setIsShowNotification(!isShowNotification)}
          >
            <i className='fas fa-bell fa-fw' />
            {readCount > 0 && (
              <span className='badge badge-danger badge-counter'>
                {readCount}
              </span>
            )}
          </a>
          {/* Dropdown - Alerts */}
          <div
            className={
              'dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in' +
              (isShowNotification ? ' show' : '')
            }
            aria-labelledby='alertsDropdown'
          >
            <h6 className='dropdown-header'>Alerts Center</h6>
            {notificationElements}
            <a
              className='dropdown-item text-center small text-gray-500'
              href='/#'
            >
              Show All Alerts
            </a>
          </div>
        </li>
        <div className='topbar-divider d-none d-sm-block' />
        {/* Nav Item - User Information */}
        <li className='nav-item dropdown no-arrow'>
          <a
            className='nav-link dropdown-toggle'
            href='/#'
            id='userDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded={isShowProfileDropdown ? 'true' : 'false'}
            onClick={() => setIsShowProfileDropdown(!isShowProfileDropdown)}
          >
            <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
              {user?.first_name}
            </span>
            <img className='img-profile rounded-circle' src={user?.avatar} />
          </a>
          {/* Dropdown - User Information */}
          <div
            className={
              'dropdown-menu dropdown-menu-right shadow animated--grow-in' +
              (isShowProfileDropdown ? ' show' : '')
            }
            aria-labelledby='userDropdown'
          >
            <a className='dropdown-item' href='/#'>
              <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400' />
              Profile
            </a>
            <a className='dropdown-item' href='/#'>
              <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400' />
              Settings
            </a>
            <a className='dropdown-item' href='/#'>
              <i className='fas fa-list fa-sm fa-fw mr-2 text-gray-400' />
              Activity Log
            </a>
            <div className='dropdown-divider' />
            <a
              className='dropdown-item'
              href='/#'
              data-toggle='modal'
              data-target='#logoutModal'
              onClick={() => dispatch(logout())}
            >
              <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400' />
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};
