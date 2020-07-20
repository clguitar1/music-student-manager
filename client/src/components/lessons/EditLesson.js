import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import { Link } from 'react-router-dom';
// import moment from 'moment';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import LessonContext from '../../context/lesson/lessonContext';

// pass in props to use onSubmit to redirect
const EditLesson = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const lessonContext = useContext(LessonContext);

  const { isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const { currentLesson, clearCurrentLesson, updateLesson } = lessonContext;

  const [lesson, setLesson] = useState({
    lessonSlot: '',
    attendance: '',
    assignment: '',
  });

  // destructure lesson state from useState
  const { assignment, attendance, lessonSlot } = lesson;

  // populate the form with lesson data on edit button click
  useEffect(() => {
    authContext.loadUser();

    if (currentLesson !== null) {
      const newCurrent = {
        ...currentLesson,
        lessonSlot: new Date(currentLesson.lessonSlot),
      };
      setLesson(newCurrent);
    } else {
      setLesson({
        lessonSlot: '',
        attendance: '',
        assignment: '',
      });
    }
    // pass in empty array of dependencies to avoid infinite loop
  }, []);

  const clearAll = () => {
    clearCurrentLesson();
  };

  // set state with lesson form data
  const onChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  // set lessonSlot state to date object from DatePicker
  const onChangeDate = (date) => {
    setLesson({ ...lesson, lessonSlot: date });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // update lesson data
    if (currentLesson !== null) {
      await updateLesson(lesson);
      setAlert('Lesson Updated', 'success');
    }
    // // set currentLesson back to null
    // clearAll();

    // redirect back to home page after submit
    props.history.push('/dashboard');
  };

  return (
    <div className='EditLesson'>
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <form onSubmit={onSubmit}>
              {isAuthenticated && (
                <h1>
                  Edit {currentLesson.student.name}'s Lesson
                  {/* for{' '}
                  {moment(lessonSlot).format('dddd MMMM Do YYYY, h:mm a')} */}
                </h1>
              )}
              <div className='form-group row'>
                <label className='col-sm-2 col-form-label'>Lesson Date</label>
                <div className='col-sm-10'>
                  <DatePicker
                    placeholderText='Click to select a date and time'
                    selected={lessonSlot}
                    onChange={onChangeDate}
                    showTimeSelect
                    dateFormat='MMMM d, yyyy h:mm aa'
                    className='form-control block'
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-2 col-form-label'>Assignment</label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    placeholder='Assignment'
                    name='assignment'
                    value={assignment}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
              </div>
              <fieldset className='form-group'>
                <div className='row'>
                  <legend className='col-form-label col-sm-2 pt-0'>
                    Attendance
                  </legend>
                  <div className='col-sm-10'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='attendance'
                        value='present'
                        checked={attendance === 'present'}
                        onChange={onChange}
                      />
                      <label className='form-check-label' htmlFor='gridRadios1'>
                        Present
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='attendance'
                        value='absent'
                        checked={attendance === 'absent'}
                        onChange={onChange}
                      />
                      <label className='form-check-label' htmlFor='gridRadios2'>
                        Absent
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className='form-group row'>
                <div className='col-sm-10'>
                  <button type='submit' className='btn btn-primary'>
                    Edit Lesson
                  </button>
                </div>
              </div>
            </form>
            <Link
              onClick={clearAll}
              className='btn btn-light mr-1 my-1'
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

export default EditLesson;
