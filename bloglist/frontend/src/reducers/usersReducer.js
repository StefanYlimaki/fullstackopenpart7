import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

//const getId = () => (100000 * Math.random()).toFixed(0)

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    appendUser(state, action) {
      state.push(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { appendUser, setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const createUser = (userObject) => {
  return async (dispatch) => {
    const newUser = await userService.create(userObject)
    dispatch(appendUser(newUser))
  }
}

export default usersSlice.reducer
