import { useState, useEffect, useRef } from 'react'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import DisplayBlogs from './components/DisplayBlogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Welcome ${user.username}!`, 3))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 3))
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(response))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 3))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 3))
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    window.localStorage.clear()
    dispatch(setNotification(`Goodbye ${user.username}!`, 3))
  }

  return (
    <div>
      <Notification />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>Signed in as {user.name}</p>
          <button onClick={logOut}>log out</button>
          <br />
          <br />
          <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <h2>Blogs</h2>
          <DisplayBlogs blogs={blogs} setBlogs={setBlogs} />
        </div>
      )}
    </div>
  )
}

export default App
