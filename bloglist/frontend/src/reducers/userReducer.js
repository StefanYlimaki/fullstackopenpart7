import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    saveUser(state, action) {
      return action.payload
    },
  },
})

export const { saveUser } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(saveUser(user))
  }
}
export default userSlice.reducer
