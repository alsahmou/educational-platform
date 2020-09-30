import React from 'react'
import AuthApi from '../AuthApi'


import { Route, Redirect } from 'react-router-dom'

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        <Component />
      )
        : (
          <Redirect to='/user-dashboard' />
      )}
    />
  )
}
export default ProtectedLogin
