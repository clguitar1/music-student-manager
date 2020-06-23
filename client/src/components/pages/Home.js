import React, { useContext, useEffect } from 'react';
import Students from '../students/Students';
// import StudentForm from '../students/StudentForm';
import StudentFilter from '../students/StudentFilter';
import AuthContext from '../../context/auth/authContext';
import Lessons from '../lessons/Lessons';
import DashboardTest from './DashboardTest';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='Home'>
      <DashboardTest />
    </div>
  );
};

export default Home;
