import React, { useReducer } from 'react';
import axios from 'axios';
import LessonContext from './lessonContext';
import lessonReducer from './lessonReducer';
import {
  GET_LESSONS,
  GET_LESSON,
  // ADD_LESSON,
  // DELETE_LESSON,
  // UPDATE_LESSON,
  // FILTER_LESSONS,
  // CLEAR_LESSONS,
  SET_CURRENT_LESSON,
  CLEAR_CURRENT_LESSON,
  // CLEAR_FILTER,
  LESSON_ERROR,
  UPDATE_LESSON,
} from '../types';

const LessonState = (props) => {
  const initialState = {
    lesson: null,
    lessons: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(lessonReducer, initialState);

  // Get all lessons
  // api/lessons
  const getLessons = async () => {
    try {
      const res = await axios.get('/api/lessons');

      dispatch({ type: GET_LESSONS, payload: res.data });
      // console.log(res.data);
    } catch (err) {
      dispatch({ type: LESSON_ERROR, payload: err.response.msg });
    }
  };

  // Get lesson by its ID
  const getLessonById = async (lessonId) => {
    try {
      const res = await axios.get(`/api/lessons/${lessonId}`);

      dispatch({
        type: GET_LESSON,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: LESSON_ERROR, payload: err.response.msg });
    }
  };

  // Update lesson
  const updateLesson = async (lesson) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/lessons/${lesson._id}`, lesson, config);
      dispatch({ type: UPDATE_LESSON, payload: res.data });
    } catch (err) {
      dispatch({ type: LESSON_ERROR, payload: err.response.msg });
    }
  };

  // Set current lesson in state.current with the edit button
  const setCurrentLesson = (lesson) => {
    dispatch({ type: SET_CURRENT_LESSON, payload: lesson });
  };

  // clear current lesson
  const clearCurrentLesson = () => {
    dispatch({ type: CLEAR_CURRENT_LESSON });
  };

  return (
    <LessonContext.Provider
      value={{
        lesson: state.lesson,
        lessons: state.lessons,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getLessons,
        getLessonById,
        updateLesson,
        setCurrentLesson,
        clearCurrentLesson,
      }}
    >
      {props.children}
    </LessonContext.Provider>
  );
};

export default LessonState;
