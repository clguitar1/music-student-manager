import React, { useState, useContext, useEffect } from 'react';
import LessonContext from '../../context/lesson/lessonContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const EditLesson = (props) => {
  const lessonContext = useContext(LessonContext);
  const alertContext = useContext(AlertContext);

  const { current, clearCurrentLesson, updateLesson } = lessonContext;
  const { setAlert } = alertContext;

  const [lesson, setLesson] = useState({
    lessonSlot: '',
    attendance: '',
    assignment: '',
  });

  const { lessonSlot, attendance, assignment } = lesson;

  // populate the form with student data on edit button click
  useEffect(() => {
    if (current !== null) {
      const newCurrent = {
        ...current,
        lessonSlot: new Date(current.lessonSlot),
      };
      setLesson(newCurrent);
    } else {
      setLesson({
        lessonSlot: '',
        attendance: '',
        assignment: '',
      });
    }
  }, [lessonContext, current]);

  const clearAll = () => {
    clearCurrentLesson();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // update student data
    if (current !== null) {
      await updateLesson(lesson);
      setAlert('Lesson Updated', 'success');
    }
    // set current back to null
    clearAll();
    // redirect back to home page after submit
    props.history.push('/');
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
        <h2 className='text-secondary'>Edit {current.student.name}'s Lesson</h2>
        {/* <input
          type='text'
          placeholder='Student name'
          name='name'
          value={name}
          onChange={onChange}
        /> */}
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
        <h5>Attendance</h5>
        <div className='radio'>
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
        </div>

        <div>
          <input
            type='submit'
            value={'Update Lesson'}
            className='btn btn-primary btn-block'
          />
        </div>
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      </form>
      <Link onClick={clearAll} className='btn btn-light' to='/'>
        Back
      </Link>
    </div>
  );
};

export default EditLesson;
