import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import moment from 'moment';
import LessonContext from '../../context/lesson/lessonContext';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

Modal.setAppElement('#root');
const LessonItem = ({ lesson }) => {
  const lessonContext = useContext(LessonContext);
  const alertContext = useContext(AlertContext);

  const {
    // lessons,
    // filtered,
    // getLessons,
    // loading,
    // addLesson,
    deleteLesson,
    setCurrentLesson,
    clearCurrentLesson,
  } = lessonContext;
  const { setAlert } = alertContext;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { _id, assignment, attendance, lessonSlot, student } = lesson;

  const onDelete = () => {
    deleteLesson(_id);
    setModalIsOpen(false);
    clearCurrentLesson();
    setAlert('Lesson Deleted', 'danger');
  };

  // send lesson data to context state to populate the form in EditLesson.js
  const onEdit = () => {
    setCurrentLesson(lesson);
  };

  return (
    <div className='LessonItem card bg-light'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(128,128,128,0.3)',
          },
          content: {
            top: '102px',
            left: '103px',
            right: '103px',
            bottom: '275px',
          },
        }}
      >
        <h2>Are you sure you want to delete this lesson?</h2>
        <p>This action cannot be undone</p>
        <div>
          <button onClick={onDelete}>Delete Lesson</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>

      <ul className='list'>
        <li>
          Lesson Slot: {moment(lessonSlot).format('dddd MMMM Do YYYY, h:mm a')}
        </li>
        <li>Student: {student.name} </li>
        <li>{attendance}</li>
        <li>{assignment}</li>
      </ul>
      <p>
        <Link onClick={onEdit} to='/edit-lesson' className='btn btn-dark mr-2'>
          Edit
        </Link>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => setModalIsOpen(true)}
        >
          Delete
        </button>
        <Link to={`/lesson/${_id}`} className='btn btn-dark mr-2'>
          View Lesson
        </Link>
      </p>
    </div>
  );
};

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
};

export default LessonItem;
