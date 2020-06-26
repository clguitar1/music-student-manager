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
    <div className='Lesson'>
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1>Lesson Details</h1>
            </div>
            {lesson !== null ? (
              <>
                <ul className='list'>
                  <li>Student: {lesson.student.name}</li>
                  <li>Lesson assignment: {lesson.assignment}</li>
                  <li>{lesson.attendance}</li>
                  <li>
                    Lesson slot:{' '}
                    {moment(lesson.lessonSlot).format(
                      'dddd MMMM Do YYYY, h:mm a'
                    )}
                  </li>
                  <li>
                    Lesson created on:{' '}
                    {moment(lesson.createdAt).format(
                      'dddd MMMM Do YYYY, h:mm a'
                    )}
                  </li>
                </ul>
              </>
            ) : (
              <Spinner />
            )}
            <Link className='btn btn-dark' to='/dashboard'>
              Back
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
