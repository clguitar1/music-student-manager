import React, { useContext } from 'react';
import StudentItem from './StudentItem';
import StudentContext from '../../context/student/studentContext';

const Students = () => {
  const studentContext = useContext(StudentContext);
  const { students, filtered } = studentContext;

  if (students.length === 0) {
    return <h4>Please add a student</h4>;
  }

  return (
    <div className='Students'>
      {filtered !== null
        ? filtered.map((student) => (
            <StudentItem key={student.id} student={student} />
          ))
        : students.map((student) => (
            <StudentItem key={student.id} student={student} />
          ))}
    </div>
  );
};

export default Students;
