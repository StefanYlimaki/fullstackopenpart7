import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import store from '../store'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    console.log(store.getState())
    event.preventDefault()
    const blogObject = {
      title: `${title}`,
      author: `${author}`,
      url: `${url}`,
    }
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          3
        )
      )
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 3))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
            id="url"
          />
        </div>
        <button type="submit" id="create-button">
          create
        </button>
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
