import React, { useContext } from 'react';
import StudentItem from './StudentItem';
import StudentContext from '../../context/student/studentContext';

const Students = () => {
  const studentContext = useContext(StudentContext);
  const { students } = studentContext;

  return (
    <div className='Students'>
      {students.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))}
    </div>
  );
};

export default Students;
