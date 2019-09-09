import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Adimn from './_component/admin';
import Login from './_component/Login';

class App extends Component {
   constructor(){
       super();
       this.state ={users: []};
   }
   componentDidMount() {
          fetch('/users')
            .then(res => {
                console.log(res);
                return res.json()
             })
            .then(users => { 
                console.log(users); 
                this.setState({ users })
             });
         }
   render() {
        return (
            <Router className="App">
            <div className="App">
                {this.state.users.map(user =>
                <div key={user.id}>user: {user.email} Password: {user.password}</div>
              )}
            </div>
            <Route path="/" exact component={Login}/>
            <Route path="/admin" exact component={Adimn} />
           </Router>
        );
    }
}
export default App;