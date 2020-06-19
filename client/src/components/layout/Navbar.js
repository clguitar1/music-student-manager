import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';
import LessonContext from '../../context/lesson/lessonContext';

const Navbar = ({ title, icon }) => {
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
    <Fragment>
      <li>
        <Link
          onClick={clearCurrent}
          className='btn btn-light'
          to='/create-student'
        >
          New Student
        </Link>
      </li>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span> Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='Navbar navbar bg-primary'>
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Lesson Tracker',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
