import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { deleteUsers, loadUsersPaging } from '../../../store/users/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { IUser } from '../../../store/users/types';
import { Link } from 'react-router-dom';
import { Pagination } from '../../../components';
import { UrlConstants } from '../../../constants';
import swal from 'sweetalert';

export const Users = () => {
  const users: IUser[] = useSelector((state: AppState) => state.users.items);
  const totalItems = useSelector((state: AppState) => state.users.total);
  const pageSize = useSelector((state: AppState) => state.users.pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsersPaging(searchKeyword, currentPage));
  }, [dispatch, currentPage, searchKeyword]);

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(loadUsersPaging(searchKeyword, pageNumber));
  };

  const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const clearSearch = () => {
    setSearchKeyword('');
    dispatch(loadUsersPaging('', 1));
  };

  const handleSelectRow = (id: string) => {
    let newSelectedItems = [...selectedItems];
    selectedItems.indexOf(id) !== -1
      ? (newSelectedItems = selectedItems.filter((item) => item !== id))
      : newSelectedItems.push(id);

    setSelectedItems(newSelectedItems);
  };

  const handleDelete = () => {
    if (selectedItems) {
      swal({
        title: 'Xác nhận',
        text: 'Bạn có muốn xoá các bản ghi này?',
        icon: 'warning',
        buttons: ['Huỷ', 'Xác nhận'],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteUsers(selectedItems));
          setSelectedItems([]);
        }
      });
    }
  };

  const userElements: JSX.Element[] = users.map((user) => {
    return (
      <tr
        key={`user_${user._id}`}
        className={`table-row ${
          selectedItems.indexOf(user._id) !== -1 ? 'selected' : ''
        }`}
        onClick={() => handleSelectRow(user._id)}
      >
        <td>
          <input
            type='checkbox'
            value={`${user._id}`}
            onChange={() => handleSelectRow(user._id)}
            checked={selectedItems.indexOf(user._id) !== -1}
          />
        </td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>
          <Link to={UrlConstants.USER_EDIT + user._id}>Sửa</Link>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div>
        <h1 className='h3 mb-2 text-gray-800'>Danh sách người dùng</h1>
        {showSearch && (
          <div className='row mb-3'>
            <div className='col-xl-12 col-md-12 mb-12'>
              <div className='card'>
                <h5 className='card-header'>Tìm kiếm</h5>
                <div className='header-buttons'>
                  <button
                    className='btn btn-default'
                    onClick={() => setShowSearch(false)}
                  >
                    Đóng
                    <i className='fas fa-times'></i>
                  </button>
                </div>
                <div className='card-body'>
                  <form className='form-inline'>
                    <div className='col-auto'>
                      <input
                        type='text'
                        value={searchKeyword}
                        onChange={handleKeywordPress}
                        className='form-control'
                        placeholder='Từ khoá'
                      />
                    </div>

                    <button
                      type='button'
                      onClick={() =>
                        dispatch(loadUsersPaging(searchKeyword, currentPage))
                      }
                      className='btn btn-primary my-1'
                    >
                      Tìm kiếm
                    </button>
                    <button
                      type='button'
                      onClick={() => clearSearch()}
                      className='btn btn-default my-1'
                    >
                      Xoá
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* DataTales Example */}
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <h6 className='m-0 font-weight-bold text-primary'>
              Danh sách người dùng
            </h6>
          </div>
          <div className='header-buttons'>
            <button
              type='button'
              className='btn btn-link'
              onClick={() => setShowSearch(true)}
            >
              Tìm kiếm
            </button>
            <Link
              to={UrlConstants.USER_ADD}
              className='btn btn-outline-success btn-sm'
            >
              <span className='fa fa-plus'></span> Thêm mới
            </Link>
            {selectedItems.length > 0 && (
              <Fragment>
                <button
                  className='btn btn-outline-danger btn-sm'
                  onClick={handleDelete}
                >
                  <span className='fa fa-trash'></span> Xoá
                </button>
                <button
                  className='btn btn-outline-primary   btn-sm'
                  onClick={() => setSelectedItems([])}
                >
                  <i className='fas fa-check'></i> Bỏ chọn
                </button>
              </Fragment>
            )}
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
                    <th></th>
                    <th>Tên</th>
                    <th>Họ</th>
                    <th>Email</th>
                    <th></th>
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
