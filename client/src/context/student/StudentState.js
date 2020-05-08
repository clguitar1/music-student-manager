import React, { useReducer } from 'react';
import axios from 'axios';
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
  STUDENT_ERROR,
} from '../types';

const StudentState = (props) => {
  const initialState = {
    students: [],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Add student
  const addStudent = async (student) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/students', student, config);

      dispatch({ type: ADD_STUDENT, payload: res.data });
    } catch (err) {
      dispatch({ type: STUDENT_ERROR, payload: err.response.msg });
    }
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
