import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

class UserDashboard extends Component {
  // Username is fetched from cookies to display user's info on the page
  constructor (props) {
    super(props)
    this.state = {
      username: Cookies.get('username')
    }
  }

  // Get request is sent to the server to return responses with the user's info by setting the state's parameters 
  componentDidMount () {
    const { username } = this.state

    axios.get('http://localhost:5000/users/' + username)
      .then(response => {
        this.setState({ aboutMe: response.data.securityAnswer2 })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleLogOut = (event) => {
    Cookies.remove('username')
    window.location='./'
  }

  render () {
    return (
      <div>
        <h1>Welcome to the user dashboard</h1>
        <h1>{this.state.aboutMe}</h1>
        <p><button onClick={this.handleLogOut}>Logout</button></p>
      </div>
    )
  }
}

export default UserDashboard
