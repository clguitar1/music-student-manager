import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to the dashboard page, Home.js
      props.history.push('/dashboard');
    }

    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // check all fields are complete
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
      // check for valid email format
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setAlert('Please enter a valid email', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='Login text-center'>
      <form className='form-signin' onSubmit={onSubmit}>
        <Alerts />
        <h1 className='h3 mb-3 font-weight-normal'>Account Login</h1>
        <label className='sr-only' htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          name='email'
          className='form-control'
          placeholder='Email address'
          value={email}
          onChange={onChange}
        />

        <label className='sr-only' htmlFor='password'>
          Password
        </label>
        <input
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={onChange}
        />

        <button type='submit' className='btn btn-lg btn-primary btn-block'>
          Log in
        </button>
        <p className='mt-2'>
          Need an account?{' '}
          <Link to='/register' className='text-info'>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
