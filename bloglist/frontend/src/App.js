import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loadState } from './stateLoader'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { Routes, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import { Container, Button } from '@mui/material'


const getUser = () => {
  let user = null
  const loadedState = loadState()

  if (loadedState !== null) {
    user = JSON.parse(loadedState.user)
  }

  return user
}

const App = () => {
  const dispatch = useDispatch()
  const user = getUser()

  useEffect(() =>  {
    dispatch(setUser(JSON.stringify(user)))
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])



  const logOut = () => {
    dispatch(setNotification(`Goodbye ${user.name}!`, 3))
    window.localStorage.clear()
  }

  return (
    <Container>
      <Notification />
      {user === null
        ? <LoginForm />
        :
        <div>
          <Button color='inherit' component={Link} to="/">
            Home
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
          <Button color='secondary' onClick={logOut}>log out</Button>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </div>
      }
    </Container>
  )
}

export default App
