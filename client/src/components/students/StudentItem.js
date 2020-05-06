import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const StudentItem = ({ student }) => {
  const {
    id,
    name,
    parentName,
    email,
    phone,
    instrument,
    lessonSlot,
  } = student;

  const m = moment(lessonSlot, 'YYYY-MM-DD');
  const formattedLessonDate = m.format('LLLL');

  return (
    <div className='StudentItem card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (instrument === 'violin' ? 'badge-success' : 'badge-primary')
          }
        >
          {instrument}
        </span>
      </h3>
      <ul className='list'>
        <li>
          <i className='fas fa-calendar-alt'></i> {formattedLessonDate}
        </li>
        <li>Parent: {parentName}</li>
        <li>
          <i className='fas fa-envelope-open'></i> {email}
        </li>
        <li>
          <i className='fas fa-phone'></i> {phone}
        </li>
      </ul>
      <p>
        <button className='btn btn-dark btn-sm'>Dark</button>
        <button className='btn btn-danger btn-sm'>Danger</button>
        <button className='btn btn-accent btn-sm'>Accent</button>
      </p>
    </div>
  );
};

StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentItem;
