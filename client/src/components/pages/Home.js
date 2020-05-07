import React from 'react';
import Students from '../students/Students';
import StudentForm from '../students/StudentForm';
import StudentFilter from '../students/StudentFilter';

const Home = () => {
  return (
    <div className='Home grid-2'>
      <div>
        <StudentForm />
      </div>
      <div>
        <StudentFilter />
        <Students />
      </div>
    </div>
  );
};

export default Home;
