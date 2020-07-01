import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import StudentContext from '../../context/student/studentContext';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

Modal.setAppElement('#root');
const StudentItem = ({ student }) => {
  const studentContext = useContext(StudentContext);
  const alertContext = useContext(AlertContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { deleteStudent, setCurrent, clearCurrent } = studentContext;
  const { setAlert } = alertContext;

  const {
    _id,
    name,
    parentName,
    email,
    alternateEmail,
    phone,
    instrument,
  } = student;

  const onDelete = () => {
    deleteStudent(_id);
    setModalIsOpen(false);
    clearCurrent();
    setAlert('Student Deleted', 'danger');
  };

  const onEdit = () => {
    setCurrent(student);
  };

  const onNewLesson = () => {
    setCurrent(student);
  };

  return (
    <div className='StudentItem card bg-light'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(128,128,128,0.3)',
          },
          content: {
            top: '102px',
            left: '263px',
            right: '453px',
            bottom: '275px',
          },
        }}
      >
        <h2>Are you sure you want to delete this student and their lessons?</h2>
        <p>This action cannot be undone</p>
        <div>
          <button onClick={onDelete}>Delete Student</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
      <h3 className='text-primary text-left'>{name} </h3>
      <ul className='list'>
        <li>{instrument}</li>
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
        <Link onClick={onEdit} to='/edit-student' className='btn btn-dark mr-2'>
          Edit
        </Link>

        <button
          className='btn btn-danger btn-sm'
          onClick={() => setModalIsOpen(true)}
        >
          Delete
        </button>
        <Link to={`/student/${_id}`} className='btn btn-dark mr-2'>
          Lessons
        </Link>
        <Link
          onClick={onNewLesson}
          className='btn btn-dark'
          to='/create-lesson'
        >
          New Lesson
        </Link>
      </p>
    </div>
  );
};

StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentItem;
