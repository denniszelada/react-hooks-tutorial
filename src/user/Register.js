import React, { useState, useContext, useEffect } from 'react'
import { StateContext } from '../contexts'
import { useResource } from 'react-request-hook'

export default function Register () {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordRepeat, setPasswordRepeat ] = useState('')
  const { dispatch } = useContext(StateContext)
  const [ user, register ] = useResource((username, password) => ({
    url: '/users',
    method: 'post',
    data: { username, password }
  }))

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: 'REGISTER', username: user.data.username })
    }
  }, [user])

  function handleUsername (event) {
    setUsername(event.target.value)
  }

  function handlePassword (event) {
    setPassword(event.target.value)
  }

  function handlePasswordRepeat (event) {
    setPasswordRepeat(event.target.value)
  }

  return (
  <form onSubmit={e => { e.preventDefault(); register(username, password ) }}>
    <label htmlFor="register-username">Username:</label>
    <input type="text" value={username} onChange={handleUsername} name="register-username" id="register-username" />
    <label htmlFor="register-password">Password:</label>
    <input type="password" value={password} onChange={handlePassword} name="register-password" id="register-password" />
    <label htmlFor="register-password-repeat">Repeat password:</label>
    <input type="password" value={passwordRepeat} onChange={handlePasswordRepeat} name="register-password-repeat" id="register-password-repeat" />
    <input type="submit" value="Register" disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat} />
   </form>
  )
}
