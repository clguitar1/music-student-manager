import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const StudentLesson = ({ lesson }) => {
  const { assignment, attendance, lessonSlot, student } = lesson;
  return (
    <>
      <li key={uuidv4()}>
        {attendance && (
          <span
            style={{ float: 'right' }}
            className={
              'badge ' +
              (attendance === 'present' ? 'badge-success' : 'badge-primary')
            }
          >
            {attendance}
          </span>
        )}
      </li>
      <li key={uuidv4()}>
        <i className='fas fa-calendar-alt'></i>{' '}
        {moment(lessonSlot).format('dddd MMMM Do YYYY, h:mm a')}
      </li>
      <li key={uuidv4()}>Homework: {assignment}</li>
    </>
  );
};

StudentLesson.propTypes = {
  lesson: PropTypes.object.isRequired,
};

export default StudentLesson;
