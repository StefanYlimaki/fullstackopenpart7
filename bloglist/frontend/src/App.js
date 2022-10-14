import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import DisplayBlogs from './components/DisplayBlogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { useSelector } from 'react-redux'

import store from './store'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  let userToBeDisplayed = ''

  if(user) {
    userToBeDisplayed = JSON.parse(user)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    dispatch(setNotification(`Goodbye ${userToBeDisplayed.name}!`, 3))
    window.localStorage.removeItem('loggedUser')
    window.localStorage.clear()
    dispatch(setUser(''))
  }

  console.log('Current State: ', store.getState())

  return (
    <div>
      <Notification />

      {userToBeDisplayed === null || userToBeDisplayed === '' ? (
        <LoginForm />
      ) : (
        <div>
          <p>Signed in as {userToBeDisplayed.name}</p>
          <button onClick={logOut}>log out</button>
          <br />
          <br />
          <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <h2>Blogs</h2>
          <DisplayBlogs />
        </div>
      )}
    </div>
  )
}

export default App
