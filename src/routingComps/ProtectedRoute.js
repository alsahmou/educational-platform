import React from 'react'
import AuthApi from '../AuthApi'


import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Component />
      )
        : (
          <Redirect to='/login' />
      )}
    />
  )
}
export default ProtectedRoute
