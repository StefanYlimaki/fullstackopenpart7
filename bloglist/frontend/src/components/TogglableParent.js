import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const TogglableParent = () => {
  const blogFormRef = useRef()
  return(
    <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )
}

export default TogglableParent