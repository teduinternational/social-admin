import { Link, useParams } from 'react-router-dom';
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { getUserById, updateUser } from '../../../store/users/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { IUpdateUserRequest } from '../../../store/users/types';
import { UrlConstants } from '../../../constants';
import { validateEmail } from '../../../helpers';

export const EditUser = () => {
  let { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.users.editUser);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setFormInputs({
      first_name: user !== null ? user.first_name : '',
      last_name: user !== null ? user.last_name : '',
      email: user !== null ? user.email : '',
    });
  }, [user]);

  const [formInputs, setFormInputs] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, first_name, last_name } = formInputs;

  const loading = useSelector<AppState>((state) => state.users.loading);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (email && first_name && last_name) {
      const user: IUpdateUserRequest = {
        email: email,
        first_name,
        last_name,
      };
      dispatch(updateUser(id, user));
    }
  };

  return (
    <Fragment>
      <h1 className='h3 mb-4 text-gray-800'>Cập nhật user</h1>
      <div className='card'>
        <div className='card-header'>Thông tin user</div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && (!email || !validateEmail(email))
                    ? 'is-invalid'
                    : '')
                }
                value={email}
                name='email'
                placeholder='name@example.com'
                onChange={handleChange}
              />
              {formSubmitted && !email && (
                <div className='invalid-feedback'>Email is required</div>
              )}
              {formSubmitted && !validateEmail(email) && (
                <div className='invalid-feedback'>Email is not valid</div>
              )}
            </div>

            <div className='form-group'>
              <label>Tên</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && !first_name ? 'is-invalid' : '')
                }
                value={first_name}
                name='first_name'
                onChange={handleChange}
              />
              {formSubmitted && !first_name && (
                <div className='invalid-feedback'>First name is required</div>
              )}
            </div>
            <div className='form-group'>
              <label>Họ</label>
              <input
                type='last_name'
                className={
                  'form-control ' +
                  (formSubmitted && !last_name ? 'is-invalid' : '')
                }
                value={last_name}
                name='last_name'
                onChange={handleChange}
              />
              {formSubmitted && !last_name && (
                <div className='invalid-feedback'>Last name is required</div>
              )}
            </div>

            <div className='form-group'>
              <button className='btn btn-primary' type='submit'>
                {loading && (
                  <span className='spinner-border spinner-border-sm mr-1'></span>
                )}
                Lưu
              </button>
              <Link className='btn btn-danger' to={UrlConstants.USERS_LIST}>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
