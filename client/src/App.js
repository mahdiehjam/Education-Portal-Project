import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './_actions/authentication';
import store from './store';
import './App.css';
import Register from './_component/register';
import Login from './_component/Login';
import Home from './_component/home';
import newCourse from './_component/newCourse';
import Admin from './_component/admin';
import Navbar from './_component/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
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
                  <Route path="/admin" component={Admin} />
                  <Route path='/course' component={newCourse}/>
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;



