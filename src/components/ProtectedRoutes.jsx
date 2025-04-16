import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({user, children}) => {
  return (
    <div>
      {user ? children : <Navigate to="/" />}
    </div>
  )
}

export default ProtectedRoutes
