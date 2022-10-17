import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import loginService from '../services/login'
import store from '../store'

import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { saveState } from '../stateLoader'

import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      navigate('/')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 3))
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={{ paddingTop: 5 }}>
          <TextField
            label='password'
            type='password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div style={{ paddingTop: 5 }}>
          <Button variant='contained' color='primary' type='submit'>
            Login
          </Button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
