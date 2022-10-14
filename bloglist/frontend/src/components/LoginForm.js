import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import loginService from '../services/login'

import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

import store from '../store'
import { saveState } from '../stateLoader'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      const userToBeSaved = JSON.stringify(user)
      dispatch(setUser(userToBeSaved))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Welcome ${user.username}!`, 3))
      saveState(store.getState())
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 3))
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
