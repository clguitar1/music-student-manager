import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='Landing container'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Music Lesson Tracker</h1>
          <p className='lead'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea cumque
            sint similique nesciunt quae, adipisci sunt.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-info mr-2'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
