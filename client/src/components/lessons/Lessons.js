import React, { useContext, useEffect } from 'react';
import LessonItem from './LessonItem';
import LessonContext from '../../context/lesson/lessonContext';
import Spinner from '../layout/Spinner';

const Lessons = () => {
  const lessonContext = useContext(LessonContext);
  const { lessons, filtered, getLessons, loading } = lessonContext;

  // populate the page with list of lessons
  useEffect(() => {
    getLessons();
    // eslint-disable-next-line
  }, []);

  if (lessons !== null && lessons.length === 0 && !loading) {
    return <h4>Please add a lesson</h4>;
  }

  return (
    <div className='Lessons'>
      <h1>Lessons</h1>
      {lessons !== null && !loading ? (
        // map through live search results
        filtered !== null ? (
          filtered.map((lesson) => (
            <LessonItem key={lesson._id} lesson={lesson} />
          ))
        ) : (
          lessons.map((lesson) => (
            <LessonItem key={lesson._id} lesson={lesson} />
          ))
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Lessons;
