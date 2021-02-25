import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { login, logout } from '../../store/account/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../store';

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const loading = useSelector<AppState>((state) => state.account.loading);

  const { email, password } = inputs;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (email && password) {
      dispatch(login(email, password));
    }
  };

  return (
    <div className='container'>
      {/* Outer Row */}
      <div className='row justify-content-center'>
        <div className='col-xl-10 col-lg-12 col-md-9'>
          <div className='card o-hidden border-0 shadow-lg my-5'>
            <div className='card-body p-0'>
              {/* Nested Row within Card Body */}
              <div className='row'>
                <div className='col-lg-6 d-none d-lg-block bg-login-image' />
                <div className='col-lg-6'>
                  <div className='p-5'>
                    <div className='text-center'>
                      <h1 className='h4 text-gray-900 mb-4'>Welcome Back!</h1>
                    </div>
                    <form className='user' onSubmit={handleSubmit}>
                      <div className='form-group'>
                        <input
                          type='email'
                          className={
                            'form-control form-control-user ' +
                            (submitted && !email ? 'is-invalid' : '')
                          }
                          id='exampleInputEmail'
                          aria-describedby='emailHelp'
                          onChange={handleChange}
                          placeholder='Enter Email Address...'
                          name='email'
                        />
                        {submitted && !email && (
                          <div className='invalid-feedback'>
                            Email is required
                          </div>
                        )}
                      </div>
                      <div className='form-group'>
                        <input
                          type='password'
                          className={
                            'form-control form-control-user ' +
                            (submitted && !email ? 'is-invalid' : '')
                          }
                          id='exampleInputPassword'
                          placeholder='Password'
                          onChange={handleChange}
                          name='password'
                        />
                        {submitted && !password && (
                          <div className='invalid-feedback'>
                            Password is required
                          </div>
                        )}
                      </div>
                      <div className='form-group'>
                        <button className='btn btn-primary'>
                          {loading && (
                            <span className='spinner-border spinner-border-sm mr-1'></span>
                          )}
                          Login
                        </button>
                      </div>
                    </form>
                    <hr />
                    <div className='text-center'>
                      <a className='small' href='forgot-password.html'>
                        Forgot Password?
                      </a>
                    </div>
                    <div className='text-center'>
                      <a className='small' href='register.html'>
                        Create an Account!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
