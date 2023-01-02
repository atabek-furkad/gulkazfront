import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)

  const handleLogout = () => {
    localStorage.clear()
    dispatch({
      type: 'LOGOUT',
    })
  }

  return (
    <nav>
      <Link to="/">
        <img src="/images/logo.png" width="50" alt="" />
      </Link>

      <Link className="link" to={`/profile`}>
        Profile
      </Link>

      {state?.userInfo ? (
        <Link onClick={handleLogout} className="link" to={`/`}>
          Logout
        </Link>
      ) : (
        <Link className="link" to={`/login`}>
          Login
        </Link>
      )}
    </nav>
  )
}

export default Navbar
