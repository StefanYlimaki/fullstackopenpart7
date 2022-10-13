import { useState } from 'react'
import SingleBlog from './SingleBlog'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { voteBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(blog.likes)
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
    dispatch(setNotification(`You deleted your blog ${blog.title}`, 3))
  }

  const handleLike = async () => {
    const blogObject = { ...blog, likes: likes + 1 }
    dispatch(voteBlog(blogObject))
    setLikes(likes + 1)
    dispatch(setNotification(`You liked the blog '${blogObject.title}'`, 3))
  }

  return (
    <div>
      <SingleBlog
        blog={blog}
        handleLike={handleLike}
        removeBlog={removeBlog}
        user={user}
        likes={likes}
      />
    </div>
  )
}

export default Blog
