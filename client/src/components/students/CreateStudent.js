import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import StudentContext from '../../context/student/studentContext';

const CreateStudent = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const studentContext = useContext(StudentContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const { addStudent, current } = studentContext;
  const { setAlert } = alertContext;

  const [student, setStudent] = useState({
    name: '',
    parentName: '',
    email: '',
    alternateEmail: '',
    phone: '',
    // lessonSlot: '',
    // assignment: '',
    instrument: '',
    // attendance: '',
  });

  // const clearAll = () => {
  //   clearCurrent();
  // };

  const {
    name,
    parentName,
    email,
    alternateEmail,
    phone,
    // lessonSlot,
    // assignment,
    instrument,
    // attendance,
  } = student;

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addStudent(student);
      setAlert('Student Added', 'success');
    }

    // // clear the form
    // clearAll();

    // redirect back to home page after submit
    props.history.push('/dashboard');
  };

  const onChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  return (
    <div className='CreateStudent'>
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h2>Create New Student</h2>
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
                    Create Student
                  </button>
                </div>
              </div>
            </form>
            <Link className='btn btn-light' to='/dashboard'>
              Back
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
