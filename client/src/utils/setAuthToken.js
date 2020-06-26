import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // creates a config default that will be applied to every request -  a global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
