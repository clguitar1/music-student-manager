import React from 'react';
import Students from '../students/Students';
import StudentForm from '../students/StudentForm';

const Home = () => {
  return (
    <div className='Home grid-2'>
      <StudentForm />
      <Students />
    </div>
  );
};

export default Home;
