import { useRef } from 'react'
import { loadState } from '../stateLoader'

import LoginForm from './LoginForm'
import DisplayBlogs from './DisplayBlogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const getUser = () => {
  let user = null
  const loadedState = loadState()

  if (loadedState !== null) {
    user = JSON.parse(loadedState.user)
  }
  return user
}

const Home = () => {
  const blogFormRef = useRef()
  const user = getUser()

  return(
    <div>
      {user === null
        ?
        <LoginForm />
        :
        <div>
          <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <h2>Blogs</h2>
          <DisplayBlogs />
        </div>}
    </div>
  )
}

export default Home