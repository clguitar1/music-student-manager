import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import CreateStudent from './components/students/CreateStudent';
import EditStudent from './components/students/EditStudent';
import Students from './components/students/Students';
import Student from './components/students/Student';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';

import StudentState from './context/student/StudentState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <StudentState>
        <AlertState>
          <Router>
            <div className='App dark-palette'>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute
                    exact
                    path='/create-student'
                    component={CreateStudent}
                  />
                  <PrivateRoute
                    exact
                    path='/edit-student'
                    component={EditStudent}
                  />
                  <PrivateRoute exact path='/students' component={Students} />
                  <PrivateRoute exact path='/student/:id' component={Student} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </StudentState>
    </AuthState>
  );
};

export default App;
