import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Homepage extends Component {
  render () {
    return (
      <div>
        <h1>Welcome to alraw media!</h1>
        <Link className='login' to='/login/'>Login</Link>
        <Link className='signup' to='/signup/'>Signup</Link>
        <Link className='leaderboard' to='/leaderboard/'>leaderboard</Link>
      </div>
    )
  }
}

export default Homepage
