import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AntTab from './_component/admin';

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
            <Router>
            <div className="App">
                <h1>Users</h1>
                {this.state.users.map(user =>
                <div key={user.id}>user: {user.name} Password: {user.password}</div>
              )}
            </div>
            <Route path="/admin" exact component={AntTab} />
           </Router>
        );
    }
}
export default App;