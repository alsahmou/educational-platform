import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

class Signup extends Component {
    // Constructing the form fields with inital values 
  constructor(props){
    super(props)
    this.state = {
      name: null, 
      username: null,
      email: null,
      aboutMe: null,
      securityAnswer1: null,
      securityAnswer2: null,
      securityAnswer3: null,
      password: null,
      passwordConfirmation: null,
      isAdmin: false
    }
    
    // Creating references to all form fields to be used in the form
    this.inputNameRef = React.createRef()
    this.inputUsernameRef = React.createRef()
    this.inputEmailRef = React.createRef()
    this.inputAboutMeRef = React.createRef()
    this.inputSecurityAnswer1Ref = React.createRef()
    this.inputSecurityAnswer2Ref = React.createRef()
    this.inputSecurityAnswer3Ref = React.createRef()
    this.inputPasswordRef = React.createRef()
    this.inputPasswordConfirmationRef = React.createRef()
  }
  
  // Verifying that the password and password confirmation input are equal, returns an alert if not
  handleSubmit = (event) => {
    event.preventDefault()
    const { username, password, passwordConfirmation } = this.state
    if (username.length < 6) {
      alert('Minimum username length is 6 characters')
    }
    if (password.length < 6) {
      alert('Minimum password length is 6 characters')
    }
    if (password !== passwordConfirmation) {
      alert('Passwords do not match!')
    } 
    else {
      const user = this.state
      console.log('User submitted', user)

      axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data))
    }
  }

  // Changes the value of the state value while the user is inputting into the form fields
  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Clear button handler, clears all fields in the form by changing the values to ''
  handleClearClick = (event) => {
    event.preventDefault()
    this.setState({
      name: '',
      username: '',
      email: '',
      aboutMe: '',
      securityAnswer1: '',
      securityAnswer2: '',
      securityAnswer3: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  render () {

    // Defining form field variables to be used to change the value of the form fields to be submitted later
    const {name} = this.state
    const {username} = this.state
    const {email} = this.state
    const {aboutMe} = this.state
    const {securityAnswer1} = this.state
    const {securityAnswer2} = this.state
    const {securityAnswer3} = this.state
    const {password} = this.state
    const {passwordConfirmation} = this.state
    const {isAdmin} = this.state

    return (
      <div>
        <h1>Signup here!</h1>

        {/* The full name is appended to the title while the user is filling the name form field */}
        <p>Welcome to alraw {name}!</p>
        <form onSubmit={this.handleSubmit}>

          {/* Form field inputs */}
          <label>Full Name:<input ref={this.inputNameRef} type='text' placeholder='Full Name' value={name} name='name' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>Username:<input ref={this.inputUsernameRef} type='text' placeholder='Username' value={username} name='username' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>Email:<input ref={this.inputEmailRef} type='email' placeholder='Email' value={email} name='email' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>About me:<textarea ref={this.inputAboutMeRef} type='text-area' placeholder='About me' value={aboutMe} name='aboutMe' required={false} onChange={this.handleInputChange}/></label><br></br>
          <label>Security Question 1:<input ref={this.inputSecurityAnswer1Ref} type='text' placeholder='Security Answer' value={securityAnswer1} name='securityAnswer1' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>Security Question 2:<input ref={this.inputSecurityAnswer2Ref} type='text' placeholder='Security Answer' value={securityAnswer2} name='securityAnswer2' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>Security Question 3:<input ref={this.inputSecurityAnswer3Ref} type='text' placeholder='Security Answer' value={securityAnswer3} name='securityAnswer3' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>Password:<input ref={this.inputPasswordRef} type='password' placeholder='Password' value={password} name='password' required={true} onChange={this.handleInputChange}/></label><br></br>
          <label>Password Confirmation:<input ref={this.inputPasswordConfirmationRef} type='password' placeholder='Password Confirmation' value={passwordConfirmation} name='passwordConfirmation' required={true} onChange={this.handleInputChange}/></label><br></br>
          
          {/* Form buttons */}
          <p><button>Submit</button></p>
          <p><button onClick={this.handleClearClick}>Clear</button></p>
        </form>

        {/* Link to the homepage */}
        <Link className='homepage-link' to='/about/'>Back to homepage</Link>
      </div>
    )
  }
}

export default Signup
