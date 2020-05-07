import React, { useState, useContext } from 'react';
import StudentContext from '../../context/student/studentContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StudentForm = () => {
  const studentContext = useContext(StudentContext);
  const { addStudent } = studentContext;

  const [student, setStudent] = useState({
    name: '',
    parentName: '',
    email: '',
    phone: '',
    lessonSlot: '',
    instrument: '',
  });

  const { name, parentName, email, phone, lessonSlot, instrument } = student;

  const onSubmit = (e) => {
    e.preventDefault();
    addStudent(student);
    setStudent({
      name: '',
      parentName: '',
      email: '',
      phone: '',
      lessonSlot: '',
      instrument: '',
    });
  };

  const onChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const onChangeDate = (date) => setStudent({ ...student, lessonSlot: date });

  return (
    <div className='StudentForm'>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>Add Student</h2>
        <input
          type='text'
          placeholder='Student name'
          name='name'
          value={name}
          onChange={onChange}
        />
        <DatePicker
          placeholderText='Click to select a date and time'
          selected={lessonSlot}
          onChange={onChangeDate}
          showTimeSelect
          dateFormat='MMMM d, yyyy h:mm aa'
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
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
        />
        <h5>Student Instrument</h5>
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
        <div>
          <input type='submit' className='btn btn-primary btn-block' />
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
