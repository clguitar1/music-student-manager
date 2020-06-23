import React, { useState, useContext, useEffect } from 'react';
import StudentContext from '../../context/student/studentContext';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const EditStudent = (props) => {
  const studentContext = useContext(StudentContext);
  const alertContext = useContext(AlertContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    deleteStudent,
    setCurrent,
    current,
    clearCurrent,
    updateStudent,
  } = studentContext;
  const { setAlert } = alertContext;

  const [student, setStudent] = useState({
    name: '',
    parentName: '',
    email: '',
    alternateEmail: '',
    phone: '',
    instrument: '',
  });

  // populate the form with student data on edit button click
  useEffect(() => {
    if (current !== null) {
      const newCurrent = {
        ...current,
        // lessonSlot: new Date(current.lessonSlot),
      };
      setStudent(newCurrent);
    } else {
      setStudent({
        name: '',
        parentName: '',
        email: '',
        alternateEmail: '',
        phone: '',
        instrument: '',
      });
    }
  }, [studentContext, current]);

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
    // redirect back to home page after submit
    props.history.push('/dashboard');
    setAlert('Student Deleted', 'danger');
  };

  const onNewLesson = () => {
    setCurrent(student);
  };

  const clearAll = () => {
    clearCurrent();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // update student data
    if (current !== null) {
      await updateStudent(student);
      setAlert('Student Updated', 'success');
    }
    // set current back to null
    clearAll();
    // redirect back to home page after submit
    props.history.push('/dashboard');
  };

  const onChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  // // set lessonSlot state to date object from DatePicker
  // const onChangeDate = (date) => {
  //   setStudent({ ...student, lessonSlot: date });
  // };

  // const onChangeDate = (date) => {
  //   setStudent({ ...student });
  // };

  return (
    <div className='StudentForm'>
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
        <h2>Are you sure you want to delete this student and their lessons?</h2>
        <p>This action cannot be undone</p>
        <div>
          <button onClick={onDelete}>Delete Student</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>

      <form onSubmit={onSubmit}>
        <h2 className='text-secondary'>Student Details</h2>
        <input
          type='text'
          placeholder='Student name'
          name='name'
          value={name}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Parent name'
          name='parentName'
          value={parentName}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />
        <input
          type='email'
          placeholder='Alternate Email'
          name='alternateEmail'
          value={alternateEmail}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
        />
        <h5>Instrument</h5>
        <div className='radio'>
          <input
            type='radio'
            name='instrument'
            value='violin'
            checked={instrument === 'violin'}
            onChange={onChange}
          />{' '}
          Violin{'  '}
          <input
            type='radio'
            name='instrument'
            value='guitar'
            checked={instrument === 'guitar'}
            onChange={onChange}
          />{' '}
          Guitar
          {/* <h5>Attendance</h5>
          <input
            type='radio'
            name='attendance'
            value='present'
            checked={attendance === 'present'}
            onChange={onChange}
          />{' '} */}
          {/* Present{'  '}
          <input
            type='radio'
            name='attendance'
            value='absent'
            checked={attendance === 'absent'}
            onChange={onChange}
          />{' '}
          Absent{' '}
          <input
            type='radio'
            name='attendance'
            value=''
            checked={attendance === ''}
            onChange={onChange}
          />{' '}
          None */}
        </div>

        <div>
          <input
            type='submit'
            value={'Update Student'}
            className='btn btn-primary btn-block'
          />
        </div>
        {/* <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div> */}
      </form>
      <Link onClick={onNewLesson} className='btn btn-dark' to='/create-lesson'>
        New Lesson
      </Link>
      <button
        className='btn btn-danger btn-sm'
        onClick={() => setModalIsOpen(true)}
      >
        Delete Student
      </button>
      <Link onClick={clearAll} className='btn btn-light' to='/dashboard'>
        Back
      </Link>
    </div>
  );
};

export default EditStudent;
