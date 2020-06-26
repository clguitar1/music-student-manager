import React, { useState, useContext } from 'react';
import StudentContext from '../../context/student/studentContext';
import LessonContext from '../../context/lesson/lessonContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const CreateLesson = (props) => {
  const studentContext = useContext(StudentContext);
  const lessonContext = useContext(LessonContext);

  const alertContext = useContext(AlertContext);

  const { current, clearCurrent } = studentContext;
  const { addLesson, clearCurrentLesson } = lessonContext;
  const { setAlert } = alertContext;

  const [lesson, setLesson] = useState({
    lessonSlot: '',
    assignment: '',
    instrument: '',
    attendance: '',
  });

  const clearAll = () => {
    clearCurrentLesson();
    clearCurrent();
  };

  const { lessonSlot, assignment, instrument, attendance } = lesson;

  const onSubmit = (e) => {
    e.preventDefault();
    if (current !== null) {
      addLesson(lesson, current._id);
      console.log(lesson, current._id);
      setAlert('Lesson Added', 'success');
    }

    // clear the form
    clearAll();

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
      <form onSubmit={onSubmit}>
        <h2 className='text-secondary'>Add Lesson for {current.name}</h2>
        <DatePicker
          placeholderText='Click to select a date and time'
          selected={lessonSlot}
          onChange={onChangeDate}
          showTimeSelect
          dateFormat='MMMM d, yyyy h:mm aa'
        />
        <input
          type='text'
          placeholder='Assignment'
          name='assignment'
          value={assignment}
          onChange={onChange}
        />
        <h5>Instrument</h5>
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
        <h5>Attendance</h5>
        <input
          type='radio'
          name='attendance'
          value='present'
          checked={attendance === 'present'}
          onChange={onChange}
        />{' '}
        Present{'  '}
        <input
          type='radio'
          name='attendance'
          value='absent'
          checked={attendance === 'absent'}
          onChange={onChange}
        />{' '}
        Absent
        <div>
          <input
            type='submit'
            value={'Add Lesson'}
            className='btn btn-primary btn-block'
          />
        </div>
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      </form>
      <Link onClick={clearCurrent} className='btn btn-light' to='/dashboard'>
        Back
      </Link>
    </div>
  );
};

export default CreateLesson;
