import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { voteBlog } from '../reducers/blogReducer'
import { commentBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

import { TextField, Button } from '@mui/material'

const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(blog.likes)
  const [comments, setComments] = useState(blog.comments)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
    dispatch(setNotification(`You deleted your blog ${blog.title}`, 3))
    navigate('/')
  }

  const handleLike = async () => {
    try{
      const blogObject = { ...blog, likes: likes + 1 }
      dispatch(voteBlog(blogObject))
      setLikes(likes + 1)
      dispatch(setNotification(`You liked the blog '${blogObject.title}'`, 3))
    } catch (error) {
      console.log('error')
    }
  }

  const generateId = () => {
    return Math.floor(Math.random()*1000000)
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try{
      const blogComments = [
        ...comments, {
          'content': comment,
          'id': generateId()
        }]
      const blogObject = { ...blog, comments: blogComments }
      dispatch(commentBlog(blogObject))
      setComments(blogComments)
      dispatch(setNotification(`You commented on the blog '${blogObject.title}'`, 3))
      setComment('')
    } catch (error) {
      console.log(error)
    }
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
        Added by <strong>{blog.user.username}</strong>
      </div>
      <h3>Comments</h3>
      {comments.map(comment =>
        <li key={comment.id}>
          {comment.content}
        </li>)}
      <form onSubmit={handleComment}>
        <div style={{ paddingLeft: 5, paddingTop: 10 }}>
          <TextField
            value={comment}
            type='text'
            label='comment'
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <div style={{ paddingLeft: 5, paddingTop: 5 }}>
          <Button variant='contained' color='primary' type='submit'>
            Add Comment
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SingleBlog
