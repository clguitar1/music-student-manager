import {
  GET_LESSONS,
  GET_LESSON,
  // ADD_LESSON,
  // DELETE_LESSON,
  // UPDATE_LESSON,
  // FILTER_LESSONS,
  // CLEAR_LESSONS,
  // SET_CURRENT,
  // CLEAR_CURRENT,
  // CLEAR_FILTER,
  // LESSON_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        loading: false,
      };
    case GET_LESSON:
      console.log(action.payload);
      return {
        ...state,
        lesson: action.payload,
      };
    default:
      return state;
  }
};
