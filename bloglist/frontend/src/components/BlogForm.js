import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: `${title}`,
      author: `${author}`,
      url: `${url}`,
      comments: [
        {
          content: 'moi',
          id: 123
        }
      ]
    }
    console.log('lähetetään', blogObject)
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 3))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 3))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const padding = {
    padding: 5
  }

  return (
    <>
      <form onSubmit={addBlog}>
        Create a new blog
        <div style={padding}>
          <TextField
            label='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div style={padding}>
          <TextField
            label='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div style={padding}>
          <TextField
            label='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <Button
            label='Outlined'
            variant='outlined'
            color='primary'
            type='submit'>
            Create
          </Button>
        </div>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
}

const ConnectedProps = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedProps
