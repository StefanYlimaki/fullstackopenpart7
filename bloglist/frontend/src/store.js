import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer'
import blogSlice from './reducers/blogReducer'
import userSlice from './reducers/userReducer'
import usersSlice from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    users: usersSlice,
    notification: notificationSlice,
    user: userSlice
  }
})

export default store
