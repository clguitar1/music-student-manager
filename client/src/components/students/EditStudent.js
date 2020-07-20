import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';

// pass in props to use onSubmit to redirect
const EditStudent = (props) => {
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);
  const alertContext = useContext(AlertContext);

  const {
    deleteStudent,
    setCurrent,
    current,
    clearCurrent,
    updateStudent,
  } = studentContext;

  const { setAlert } = alertContext;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [student, setStudent] = useState({
    name: '',
    parentName: '',
    email: '',
    alternateEmail: '',
    phone: '',
    instrument: '',
  });

  // destructure student state from useState which now includes _id set by useEffect
  const {
    _id,
    name,
    parentName,
    email,
    alternateEmail,
    phone,
    instrument,
  } = student;

  // populate the form with student data on edit button click and authenticate the user
  useEffect(() => {
    authContext.loadUser();

    if (current !== null) {
      // if current is populated, get data from current and set student state with it
      const newCurrent = {
        ...current,
      };
      setStudent(newCurrent);
      console.log(student);
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
    // pass in empty array of dependencies to avoid infinite loop
  }, []);

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

  // set state with student form data
  const onChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  // update student with student data from state then redirect
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

  return (
    <div className='EditStudent'>
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
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1>Student Details</h1>
            </div>
            <form onSubmit={onSubmit}>
              <div className='form-group row'>
                <label className='col-sm-2 col-form-label'>Name</label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-2 col-form-label'>Parent Name</label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    name='parentName'
                    value={parentName}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  htmlFor='inputPassword3'
                  className='col-sm-2 col-form-label'
                >
                  Email
                </label>
                <div className='col-sm-10'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  htmlFor='inputPassword3'
                  className='col-sm-2 col-form-label'
                >
                  Alternate Email
                </label>
                <div className='col-sm-10'>
                  <input
                    type='email'
                    name='alternateEmail'
                    value={alternateEmail}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  htmlFor='inputPassword3'
                  className='col-sm-2 col-form-label'
                >
                  Phone
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    name='phone'
                    value={phone}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
              </div>
              <fieldset className='form-group'>
                <div className='row'>
                  <legend className='col-form-label col-sm-2 pt-0'>
                    Instrument
                  </legend>
                  <div className='col-sm-10'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='instrument'
                        value='violin'
                        checked={instrument === 'violin'}
                        onChange={onChange}
                      />
                      <label className='form-check-label' htmlFor='gridRadios1'>
                        Violin
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='instrument'
                        value='guitar'
                        checked={instrument === 'guitar'}
                        onChange={onChange}
                      />
                      <label className='form-check-label' htmlFor='gridRadios2'>
                        Guitar
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className='form-group row'>
                <div className='col-sm-10'>
                  <button type='submit' className='btn btn-primary'>
                    Update Student
                  </button>
                </div>
              </div>
            </form>
            <Link
              onClick={onNewLesson}
              className='btn btn-dark mr-1 my-1'
              to='/create-lesson'
            >
              New Lesson
            </Link>
            <button
              className='btn btn-danger mr-1 my-1'
              onClick={() => setModalIsOpen(true)}
            >
              Delete Student
            </button>
            <Link
              onClick={clearAll}
              className='btn btn-secondary my-1'
              to='/dashboard'
            >
              Back
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
