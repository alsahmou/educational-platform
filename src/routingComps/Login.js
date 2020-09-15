import React, { Component } from 'react'

import { Link } from 'react-router-dom'

// Login page component where existing users can login to their accounts
class Login extends Component {
  render () {
    return (
      <div>
        <h1>Login over here!</h1>
        {/* Link to the homepage */}
        <Link className='homepage-link' to='/about/'>Back to homepage</Link>
      </div>
    )
  }
}

export default Login
