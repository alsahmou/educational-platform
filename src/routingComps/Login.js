import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import AuthApi from '../AuthApi'
import App from '../App'
const Bcrypt = require('bcryptjs')



// Login page component where existing users can login to their accounts
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      password: null
    }
    // Creating references to all form fields to be used in the form
    this.inputUsernameRef = React.createRef()
    this.inputPasswordRef = React.createRef()
  }

  // Form submit handler
  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = this.state

    //Sending an axios request to get the username from the DB 
    axios.get('http://localhost:5000/users/' + username + '/' + password)
      .then(res => {
        // If the result is null then the username doesn't exist
        if (res.data.length === 0) {
          alert('username or password are incorrect')
        }
        else {
          console.log('correct password')
          window.location = '/user-dashboard'
        }
      } 
    )
  }

  // Changes the value of the state value while the user is inputting into the form fields
  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    // Defining form field variables to be used to change the value of the form fields to be submitted later
    const {username} = this.state
    const {password} = this.state

    return (
      <div>
        <h1>Login over here!</h1>
        <form onSubmit={this.handleSubmit}>

          {/* Form field inputs */}
          <label>Username:<input ref={this.inputUsernameRef} type='text' placeholder='Username' value={username} name='username' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>Password:<input ref={this.inputPasswordRef} type='password' placeholder='Password' value={password} name='password' required={true} onChange={this.handleInputChange}/></label><br></br>
          
          {/* Form buttons */}
          <p><button>Submit</button></p>
        </form>
        
        {/* Link to the homepage */}
        <Link className='homepage-link' to='/about/'>Back to homepage</Link>
      </div>
    )
  }
}

export default Login
