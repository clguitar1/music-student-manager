import React, { useContext, useEffect } from 'react';
import StudentItem from './StudentItem';
import StudentContext from '../../context/student/studentContext';
import Spinner from '../layout/Spinner';

const Students = () => {
  const studentContext = useContext(StudentContext);
  const { students, filtered, getStudents, loading } = studentContext;

  // populate the page with list of students
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);

  if (students !== null && (students.length === 0) & !loading) {
    return <h4>Please add a student</h4>;
  }

  return (
    <div className='Students'>
      {students !== null && !loading ? (
        filtered !== null ? (
          filtered.map((student) => (
            <StudentItem key={student._id} student={student} />
          ))
        ) : (
          students.map((student) => (
            <StudentItem key={student._id} student={student} />
          ))
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Students;
