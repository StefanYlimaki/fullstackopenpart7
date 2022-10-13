import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer'
import blogSlice from './reducers/blogReducer'
import userSlice from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    users: userSlice,
    notification: notificationSlice,
  },
})

export default store
