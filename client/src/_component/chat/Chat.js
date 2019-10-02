import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('/api/users/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.setState({
          currentUsername: username,  //this.props.auth
          currentScreen: 'ChatScreen'
        })
      })
      .catch(error => console.error('error', error))
  }

  render() {
        if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
          return <UsernameForm onSubmit={this.onUsernameSubmitted} />
        }
        if (this.state.currentScreen === 'ChatScreen') {
          return <ChatScreen currentUsername={this.state.currentUsername} />
        }
      }
    }
    
    Chat.propTypes = {
      //registerUser: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
      errors: state.errors,
      auth: state.auth,
     // courseStatus: state.courseStatus
  });
  
  export default connect(mapStateToProps)(withRouter(Chat))
