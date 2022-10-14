import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import DisplayBlogs from './components/DisplayBlogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loadState } from './stateLoader'
import { setUser } from './reducers/userReducer'

/**
 * This is a function for retrieving information on active user.
 * This function serves like a local memory that saves an user.
 * This function allows the application to remember a user.
 * With this function the user doesn't have to log in after every refresh
 *
 * @return {user} object or null
 */
const getUser = () => {
  let user = null
  const loadedState = loadState()

  if (loadedState !== null) {
    user = JSON.parse(loadedState.user)
  }

  return user
}

/**
 * This is a Main function.
 * Displays login page or the application page
 * depending on if the user is logged in.
 * @returns {JSX} main page
 */
const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = getUser()

  useEffect(() =>  {
    dispatch(setUser(JSON.stringify(user)))
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const logOut = () => {
    dispatch(setNotification(`Goodbye ${user.name}!`, 3))
    window.localStorage.clear()
  }

  return (
    <div>
      <Notification />
      {user === null
        ?
        <LoginForm />
        :
        <div>
          <p>Signed in as {user.name}</p>
          <button onClick={logOut}>log out</button>
          <br />
          <br />
          <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <h2>Blogs</h2>
          <DisplayBlogs />
        </div>
      }
    </div>
  )
}

export default App
