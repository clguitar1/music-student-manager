import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StudentContext from '../../context/student/studentContext';
import moment from 'moment';
import { Link } from 'react-router-dom';

const StudentItem = ({ student }) => {
  const studentContext = useContext(StudentContext);
  const { deleteStudent, setCurrent, clearCurrent } = studentContext;

  const {
    _id,
    name,
    parentName,
    email,
    alternateEmail,
    phone,
    instrument,
    lessonSlot,
    assignment,
    attendance,
  } = student;

  const onDelete = () => {
    deleteStudent(_id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(student);
  };

  return (
    <div className='StudentItem card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
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
      </h3>
      <ul className='list'>
        <li>{instrument}</li>
        <li>
          <i className='fas fa-calendar-alt'></i>{' '}
          {moment(lessonSlot).format('dddd MMMM Do YYYY, h:mm a')}
        </li>
        <li>Assignment: {assignment}</li>
        <li>Parent: {parentName}</li>
        <li>
          <i className='fas fa-envelope-open'></i> {email}
        </li>
        {alternateEmail && (
          <li>
            <i className='fas fa-envelope-open'></i> {alternateEmail}
          </li>
        )}
        <li>
          <i className='fas fa-phone'></i> {phone}
        </li>
      </ul>
      <p>
        {/* <button className='btn btn-dark btn-sm' onClick={onEdit}>
          Edit
        </button> */}
        <Link onClick={onEdit} to='/edit-student' className='btn btn-dark mr-2'>
          Edit
        </Link>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentItem;
