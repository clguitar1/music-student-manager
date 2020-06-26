import React, { useState, useContext, useEffect } from 'react';
import LessonContext from '../../context/lesson/lessonContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import moment from 'moment';
import './EditLesson.css';

const EditLesson = (props) => {
  const lessonContext = useContext(LessonContext);
  const alertContext = useContext(AlertContext);

  const { currentLesson, clearCurrentLesson, updateLesson } = lessonContext;
  const { setAlert } = alertContext;

  const [lesson, setLesson] = useState({
    lessonSlot: '',
    attendance: '',
    assignment: '',
  });

  const { assignment, attendance, lessonSlot } = lesson;

  // populate the form with lesson data on edit button click
  useEffect(() => {
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
  }, [lessonContext, currentLesson]);

  const clearAll = () => {
    clearCurrentLesson();
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

  const onChange = (e) =>
    setLesson({ ...lesson, [e.target.name]: e.target.value });

  // set lessonSlot state to date object from DatePicker
  const onChangeDate = (date) => {
    setLesson({ ...lesson, lessonSlot: date });
  };

  return (
    <div className='LessonForm'>
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <form onSubmit={onSubmit}>
              <h1>
                Edit {currentLesson.student.name}'s Lesson for{' '}
                {moment(lessonSlot).format('dddd MMMM Do YYYY, h:mm a')}
              </h1>
              <div class='form-group row'>
                <label class='col-sm-2 col-form-label'>Lesson Date</label>
                <div class='col-sm-10'>
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
              <div class='form-group row'>
                <label class='col-sm-2 col-form-label'>Assignment</label>
                <div class='col-sm-10'>
                  <input
                    type='text'
                    placeholder='Assignment'
                    name='assignment'
                    value={assignment}
                    onChange={onChange}
                    class='form-control'
                  />
                </div>
              </div>
              <fieldset class='form-group'>
                <div class='row'>
                  <legend class='col-form-label col-sm-2 pt-0'>
                    attendance
                  </legend>
                  <div class='col-sm-10'>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='attendance'
                        value='present'
                        checked={attendance === 'present'}
                        onChange={onChange}
                      />
                      <label class='form-check-label' for='gridRadios1'>
                        Present
                      </label>
                    </div>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='attendance'
                        value='absent'
                        checked={attendance === 'absent'}
                        onChange={onChange}
                      />
                      <label class='form-check-label' for='gridRadios2'>
                        Absent
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div class='form-group row'>
                <div class='col-sm-10'>
                  <button type='submit' class='btn btn-primary'>
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
