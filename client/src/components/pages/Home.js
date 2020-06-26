import React, { useContext, useEffect } from 'react';
// import Students from '../students/Students';
// import StudentFilter from '../students/StudentFilter';
import AuthContext from '../../context/auth/authContext';
// import Lessons from '../lessons/Lessons';
import Dashboard from './Dashboard';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='Home'>
      <Dashboard />
    </div>
  );
};

export default Home;
