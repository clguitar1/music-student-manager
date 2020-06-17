import React, { useContext, useEffect } from 'react';
import LessonContext from '../../context/lesson/lessonContext';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import moment from 'moment';

const Lesson = ({ match }) => {
  const lessonContext = useContext(LessonContext);
  const { lesson, getLessonById } = lessonContext;

  useEffect(() => {
    getLessonById(match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='Lesson card bg-light'>
      <h1>Lesson Details</h1>
      {lesson !== null ? (
        <>
          <ul className='list'>
            <li>Student: {lesson.student.name}</li>
            <li>Lesson assignment: {lesson.assignment}</li>
            <li>{lesson.attendance}</li>
            <li>
              Lesson slot:{' '}
              {moment(lesson.lessonSlot).format('dddd MMMM Do YYYY, h:mm a')}
            </li>
            <li>
              Lesson created on:{' '}
              {moment(lesson.createdAt).format('dddd MMMM Do YYYY, h:mm a')}
            </li>
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

export default Lesson;
