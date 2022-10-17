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

  const padding = {
    padding: 5
  }

  const logOut = () => {
    dispatch(setNotification(`Goodbye ${user.name}!`, 3))
    window.localStorage.clear()
  }

  return (
    <div>
      <Notification />
      {user === null
        ? <LoginForm />
        :
        <div>
          <Link style={padding} to='/'>Home</Link>
          <Link style={padding} to='/users'>Users</Link>
          <p>Signed in as {user.name}</p>
          <button onClick={logOut}>log out</button>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App
