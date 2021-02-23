import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { IUser } from '../../../store/users/types';
import { Pagination } from '../../../components';
import { loadUsersPaging } from '../../../store/users/actions';

export const Users = () => {
  const users: IUser[] = useSelector((state: AppState) => state.users.items);
  const totalItems = useSelector((state: AppState) => state.users.total);
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsersPaging(currentPage));
  }, [dispatch, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(loadUsersPaging(pageNumber));
  };

  const userElements: JSX.Element[] = users.map((user) => {
    return (
      <tr key={`user_${user._id}`}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div>
        <h1 className='h3 mb-2 text-gray-800'>Danh sách người dùng</h1>

        {/* DataTales Example */}
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <h6 className='m-0 font-weight-bold text-primary'>
              Danh sách người dùng
            </h6>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table
                className='table table-bordered'
                id='dataTable'
                width='100%'
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Họ</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>{userElements}</tbody>
              </table>
            </div>
          </div>
          <div className='card-footer'>
            <Pagination
              totalRecords={totalItems}
              pageLimit={5}
              pageSize={pageSize}
              onPageChanged={onPageChanged}
            ></Pagination>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
