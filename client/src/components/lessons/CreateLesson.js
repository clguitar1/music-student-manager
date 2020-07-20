import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import StudentContext from '../../context/student/studentContext';
import LessonContext from '../../context/lesson/lessonContext';

const CreateLesson = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const lessonContext = useContext(LessonContext);
  const studentContext = useContext(StudentContext);

  const { setAlert } = alertContext;
  const { students, current, clearCurrent, setCurrent } = studentContext;
  const { addLesson, clearCurrentLesson } = lessonContext;

  const [lesson, setLesson] = useState({
    lessonStudentName: '',
    lessonStudentData: '',
    lessonSlot: '',
    assignment: '',
    instrument: '',
    attendance: '',
  });

  const {
    lessonStudentName,
    lessonSlot,
    assignment,
    instrument,
    attendance,
  } = lesson;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const clearAll = () => {
    clearCurrentLesson();
    clearCurrent();
  };

  const onDropDownChange = (e) => {
    const result = students.filter(
      (student) => student.name === e.target.value
    );

    setLesson({
      ...lesson,
      lessonStudentData: result,
      lessonStudentName: e.target.value,
    });
    // https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
    const newLessonObj = { result };
    setCurrent(newLessonObj);
  };

  // set lessonSlot state to date object from DatePicker
  const onChangeDate = (date) => {
    setLesson({ ...lesson, lessonSlot: date });
  };

  const onChange = (e) =>
    setLesson({ ...lesson, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current !== null) {
      addLesson(lesson, current.result[0]._id);
      setAlert('Lesson Added', 'success');
    }
    // clear the form
    clearAll();

    // redirect back to home page after submit
    props.history.push('/dashboard');
  };

  return (
    <div className='CreateLesson'>
      <div className='container-fluid'>
        <div className='row'>
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h2>Create a New Lesson</h2>
            </div>
            <form onSubmit={onSubmit}>
              <div className='form-group row'>
                <div className='col-sm-10'>
                  <select
                    className='custom-select'
                    value={lessonStudentName}
                    onChange={onDropDownChange}
                    name='lessonStudentName'
                  >
                    <option value='Choose a student'>Choose a student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student.name}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                    Add Lesson
                  </button>
                </div>
              </div>
            </form>

            <Link
              onClick={clearCurrent}
              className='btn btn-light'
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

export default CreateLesson;
