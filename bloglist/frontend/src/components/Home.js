import { useRef } from 'react'
import DisplayBlogs from './DisplayBlogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Home = () => {
  const blogFormRef = useRef()

  return(
    <div>
      <div>
        <br />
        <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        <DisplayBlogs />
      </div>
    </div>
  )
}

export default Home