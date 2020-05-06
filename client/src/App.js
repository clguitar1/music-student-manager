import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

import StudentState from './context/student/StudentState';

import './App.css';

const App = () => {
  return (
    <StudentState>
      <Router>
        <div className='App dark-palette'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </StudentState>
  );
};

export default App;
