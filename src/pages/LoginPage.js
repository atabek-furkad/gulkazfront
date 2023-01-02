import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    dispatch({
      type: 'LOGIN_START',
    })

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }

    try {
      const response = await fetch(
        'https://gulkazapi.onrender.com/api/users/login',
        config,
      )
      if (response.status >= 400 && response.status < 600) {
        console.log(response)
        throw new Error(response.statusText)
      }
      const jsonData = await response.json()
      localStorage.setItem('userInfo', JSON.stringify(jsonData))
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: jsonData,
      })
      navigate('/')
    } catch (error) {
      console.log('error here', error)
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.message,
      })
    }

    // await fetch('/api/users//login', config)
    //   .then((response) => {
    //     if (response.status >= 400 && response.status < 600) {
    //       console.log(response)
    //       throw new Error(response.statusText)
    //     }
    //     return response.json()
    //   })
    //   .then((response) => {
    //     localStorage.setItem('userInfo', JSON.stringify(response))
    //     console.log('response 2', response)
    //     dispatch({
    //       type: 'LOGIN_SUCCESS',
    //       payload: response,
    //     })
    //   })
    //   .catch((error) => {
    //     dispatch({
    //       type: 'LOGIN_FAIL',
    //       payload: error.message,
    //     })
    //   })
    //   .finally(() => {
    //     console.log('finally')
    //   })
  }

  return (
    <div className="LoginPage">
      <h1>Login Page</h1>
      {state?.loading ? 'Loading...' : null}
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            autoFocus
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={data.password}
            onChange={handleInputChange}
            name="password"
            id="password"
          />
        </div>
        {/* make with setTimeout the error is shown for a couple of seconds */}
        {/* {data.errorMessage && <div>{data.errorMessage}</div>} */}
        {state?.error ? state.error : null}
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
