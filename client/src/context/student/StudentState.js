import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import StudentContext from './studentContext';
import studentReducer from './studentReducer';
import {
  // GET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  FILTER_STUDENTS,
  // CLEAR_STUDENTS,
  CLEAR_FILTER,
  // STUDENT_ERROR,
} from '../types';

const StudentState = (props) => {
  const initialState = {
    students: [
      {
        id: 1,
        name: 'Jill Johnson',
        parentName: 'Jills mom',
        email: 'jill@gmail.com',
        phone: '1111111111',
        instrument: 'guitar',
        lessonSlot: new Date('Tue May 05 2020 13:58:25 GMT-0400'),
      },
      {
        id: 2,
        name: 'Ted Johnson',
        parentName: 'Teds mom',
        email: 'Ted@gmail.com',
        phone: '1111111111',
        instrument: 'violin',
        lessonSlot: new Date('Tue May 05 2020 13:58:25 GMT-0400'),
      },
      {
        id: 3,
        name: 'Bob Johnson',
        parentName: 'Bobs mom',
        email: 'Bob@gmail.com',
        phone: '1111111111',
        instrument: 'violin',
        lessonSlot: new Date('Tue May 05 2020 13:58:25 GMT-0400'),
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Add student
  const addStudent = (student) => {
    student.id = uuidv4();
    dispatch({ type: ADD_STUDENT, payload: student });
  };

  // Delete student
  const deleteStudent = (id) => {
    dispatch({ type: DELETE_STUDENT, payload: id });
  };

  // Set current student in state.current with the edit button
  const setCurrent = (student) => {
    dispatch({ type: SET_CURRENT, payload: student });
  };

  // clear current student
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update student
  const updateStudent = (student) => {
    dispatch({ type: UPDATE_STUDENT, payload: student });
  };

  // Filter students
  const filterStudents = (text) => {
    dispatch({ type: FILTER_STUDENTS, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        current: state.current,
        filtered: state.filtered,
        addStudent,
        deleteStudent,
        setCurrent,
        clearCurrent,
        updateStudent,
        filterStudents,
        clearFilter,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
