import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { voteBlog } from '../reducers/blogReducer'

const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(blog.likes)

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
    console.log('+1 likes')
    dispatch(setNotification(`You liked the blog '${blogObject.title}'`, 3))
  }

  const user = JSON.parse(useSelector(state => state.user))

  return (
    <div>
      <div>
        <h2>{blog.title}
          {blog.user.username === user.username ? (
            <button d="remove-button" onClick={removeBlog}>
              remove
            </button>
          ) : (
            <></>
          )}
        </h2>
      </div>
      <div>
        <a href={`${blog.url}`} >{blog.url}</a>
      </div>
      <div>
        {likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>
        Added by <strong>{blog.author}</strong>
      </div>
    </div>
  )
}

export default SingleBlog

/*

{blog.user.username === user.username ? (
          <button d="remove-button" onClick={removeBlog}>
             remove
          </button>
        ) : (
          <></>
        )}


*/
