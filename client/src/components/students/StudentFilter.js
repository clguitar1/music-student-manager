import React, { useContext, useRef, useEffect } from 'react';
import StudentContext from '../../context/student/studentContext';

const StudentFilter = () => {
  const studentContext = useContext(StudentContext);
  const text = useRef('');

  const { filterStudents, clearFilter, filtered } = studentContext;

  useEffect(() => {
    if (filtered === null) {
      // use the reference to the input's DOM node to get the input's current value
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterStudents(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className='StudentFilter'>
      <form>
        <input
          // get a reference to the input's DOM node
          ref={text}
          type='text'
          placeholder='Filter students...'
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default StudentFilter;
