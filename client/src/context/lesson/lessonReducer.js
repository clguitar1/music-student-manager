import {
  GET_LESSONS,
  GET_LESSON,
  ADD_LESSON,
  DELETE_LESSON,
  UPDATE_LESSON,
  // FILTER_LESSONS,
  CLEAR_LESSONS,
  SET_CURRENT_LESSON,
  CLEAR_CURRENT_LESSON,
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
    case ADD_LESSON:
      return {
        ...state,
        lessons: [action.payload, ...state.lessons],
        loading: false,
      };
    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(
          (lesson) => lesson._id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_LESSON:
      // console.log(action.payload);
      return {
        ...state,
        lessons: state.lessons.map((lesson) =>
          lesson._id === action.payload._id ? action.payload : lesson
        ),
        loading: false,
      };
    case CLEAR_LESSONS:
      return {
        ...state,
        lesson: null,
        lessons: null,
        current: null,
        filtered: null,
        error: null,
      };
    case SET_CURRENT_LESSON:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_LESSON:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};
