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
      {/* <Modal
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
      </Modal> */}
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1>Student Details</h1>
            </div>
            {/* <form class='form-row' onSubmit={onSubmit}>
              <div class='form-group col-md-6'>
                <input
                  type='text'
                  placeholder='Student name'
                  name='name'
                  value={name}
                  onChange={onChange}
                  class='form-control'
                />
              </div>
              <div class='form-group col-md-6'>
                <input
                  type='text'
                  placeholder='Parent name'
                  name='parentName'
                  value={parentName}
                  onChange={onChange}
                  class='form-control'
                />
              </div>
              <div class='form-group'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  class='form-control'
                />
              </div>
              <div class='form-group'>
                <input
                  type='email'
                  placeholder='Alternate Email'
                  name='alternateEmail'
                  value={alternateEmail}
                  onChange={onChange}
                  class='form-control'
                />
              </div>
              <div class='form-group'>
                <input
                  type='text'
                  placeholder='Phone'
                  name='phone'
                  value={phone}
                  onChange={onChange}
                  class='form-control'
                />
              </div>
              <fieldset class='form-group'>
                <div class='row'>
                  <legend class='col-form-label col-sm-2 pt-0'>Radios</legend>
                  <div class='col-sm-10'>
                    <div class='form-check'>
                      <div className='radio'>
                        <input
                          type='radio'
                          name='instrument'
                          value='violin'
                          checked={instrument === 'violin'}
                          onChange={onChange}
                          class='form-check-input'
                        />
                        <label class='form-check-label' for='gridRadios1'>
                          Violin
                        </label>
                        <input
                          type='radio'
                          name='instrument'
                          value='guitar'
                          checked={instrument === 'guitar'}
                          onChange={onChange}
                          class='form-check-input'
                        />
                        <label class='form-check-label' for='gridRadios2'>
                          Guitar
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div>
                <input
                  type='submit'
                  value={'Update Student'}
                  className='btn btn-primary btn-block'
                />
              </div>
            </form> */}
            <form onSubmit={onSubmit}>
              <div class='form-group row'>
                <label class='col-sm-2 col-form-label'>Name</label>
                <div class='col-sm-10'>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={onChange}
                    class='form-control'
                  />
                </div>
              </div>
              <div class='form-group row'>
                <label class='col-sm-2 col-form-label'>Parent Name</label>
                <div class='col-sm-10'>
                  <input
                    type='text'
                    name='parentName'
                    value={parentName}
                    onChange={onChange}
                    class='form-control'
                  />
                </div>
              </div>
              <div class='form-group row'>
                <label for='inputPassword3' class='col-sm-2 col-form-label'>
                  Email
                </label>
                <div class='col-sm-10'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    class='form-control'
                  />
                </div>
              </div>
              <div class='form-group row'>
                <label for='inputPassword3' class='col-sm-2 col-form-label'>
                  Alternate Email
                </label>
                <div class='col-sm-10'>
                  <input
                    type='email'
                    name='alternateEmail'
                    value={alternateEmail}
                    onChange={onChange}
                    class='form-control'
                  />
                </div>
              </div>
              <div class='form-group row'>
                <label for='inputPassword3' class='col-sm-2 col-form-label'>
                  Phone
                </label>
                <div class='col-sm-10'>
                  <input
                    type='text'
                    name='phone'
                    value={phone}
                    onChange={onChange}
                    class='form-control'
                  />
                </div>
              </div>
              <fieldset class='form-group'>
                <div class='row'>
                  <legend class='col-form-label col-sm-2 pt-0'>
                    Instrument
                  </legend>
                  <div class='col-sm-10'>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='instrument'
                        value='violin'
                        checked={instrument === 'violin'}
                        onChange={onChange}
                      />
                      <label class='form-check-label' for='gridRadios1'>
                        Violin
                      </label>
                    </div>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='instrument'
                        value='guitar'
                        checked={instrument === 'guitar'}
                        onChange={onChange}
                      />
                      <label class='form-check-label' for='gridRadios2'>
                        Guitar
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class='form-group row'>
                <div class='col-sm-10'>
                  <button type='submit' class='btn btn-primary'>
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
