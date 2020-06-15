import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import StudentContext from '../../context/student/studentContext';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import moment from 'moment';

const Student = ({ match }) => {
  const studentContext = useContext(StudentContext);
  const { student, getStudentById, getStudents } = studentContext;

  useEffect(() => {
    getStudentById(match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='Student card bg-light'>
      <h1>Student name here: </h1>
      {student !== null ? (
        <>
          <h2>{student.name}</h2>
          <ul className='list'>
            {student.lessons.map((lesson) => (
              <>
                <li>{lesson.assignment}</li>
                <li>{lesson.attendance}</li>
              </>
            ))}
          </ul>
        </>
      ) : (
        <Spinner />
      )}

      <Link className='btn btn-dark' to='/'>
        Back
      </Link>
    </div>
  );
};

// Student.propTypes = {
//   student: PropTypes.object.isRequired,
// };

export default Student;
