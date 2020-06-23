import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';
import LessonContext from '../../context/lesson/lessonContext';

const NavbarTestComponent = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);
  const lessonContext = useContext(LessonContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearCurrent, clearStudents } = studentContext;
  const { clearLessons } = lessonContext;

  const onLogout = () => {
    logout();
    clearStudents();
    clearLessons();
  };

  const authLinks = (
    <nav class='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
      <a class='navbar-brand col-md-3 col-lg-2 mr-0 px-3' href='#'>
        <i className={icon}></i> {title}
      </a>
      <button
        class='navbar-toggler position-absolute d-md-none collapsed'
        type='button'
        data-toggle='collapse'
        data-target='#sidebarMenu'
        aria-controls='sidebarMenu'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>

      <ul class='navbar-nav px-3'>
        <li class='nav-item text-nowrap'>
          <a onClick={onLogout} class='nav-link' href='#!'>
            <i className='fas fa-sign-out-alt'></i> Sign out
          </a>
        </li>
      </ul>
    </nav>
  );

  const guestLinks = (
    <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
      <a class='navbar-brand' href='/'>
        <i className={icon}></i> {title}
      </a>
      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul class='navbar-nav ml-auto'>
          <li class='nav-item'>
            <Link class='nav-link' to='/register'>
              Sign Up
            </Link>
          </li>
          <li class='nav-item'>
            <Link class='nav-link' to='login'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  return (
    <div className='NavbarTestComponent'>
      {isAuthenticated ? authLinks : guestLinks}
      {isAuthenticated && <SidebarMenu />}
    </div>
  );
};

NavbarTestComponent.defaultProps = {
  title: 'Music Lesson Tracker',
  icon: 'fas fa-id-card-alt',
};

export default NavbarTestComponent;
