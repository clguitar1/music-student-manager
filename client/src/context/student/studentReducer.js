import {
  // GET_STUDENTS,
  ADD_STUDENT,
  // DELETE_STUDENT,
  // SET_CURRENT,
  // CLEAR_CURRENT,
  // UPDATE_STUDENT,
  // FILTER_STUDENTS,
  // CLEAR_STUDENTS,
  // CLEAR_FILTER,
  // STUDENT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    default:
      return state;
  }
};
