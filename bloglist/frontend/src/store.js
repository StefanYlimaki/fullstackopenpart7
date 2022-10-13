import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
  },
})

export default store
