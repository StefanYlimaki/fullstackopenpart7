import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

//const getId = () => (100000 * Math.random()).toFixed(0)

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    vote(state, action) {
      const idOfblog = action.payload
      const changedblog = state.find((n) => n.id === idOfblog)
      changedblog.votes += 1
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    eraseBlog(state, action) {
      const idOfBlog = action.payload
      const newState = state.filter((b) => b.id === idOfBlog)
      return newState
    },
  },
})

export const { vote, appendBlog, setBlogs, eraseBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const voteBlog = (changedBlog) => {
  return async (dispatch) => {
    await blogService.update(changedBlog.id, changedBlog)
    dispatch(vote(changedBlog.id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.filter((b) => b.id !== id)))
  }
}

export default blogSlice.reducer
