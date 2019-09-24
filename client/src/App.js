import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './_actions/authentication';
import store from './store';
import './App.scss';
import Register from './_component/register';
import Login from './_component/Login';
import Home from './_component/home';
import newCourse from './_component/admin/newCourse';
import Admin from './_component/admin/index';
import Navbar from './_component/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Teacher from './_component/teacher/teacher';
import student from './_component/student/student';


if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
  
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = '/login'
    }
  }
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
                <Navbar/>
                <Route exact path="/" component={ Home } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route path="/dashboard" component={Admin} />
                  <Route path='/course' component={newCourse}/>
                  <Route path='/teacher' component={Teacher}/>
                  <Route path='/student' component={student}/>
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;



