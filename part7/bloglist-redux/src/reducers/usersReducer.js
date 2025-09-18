import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    appendUser(state, action) {
      return state.concat(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { appendUser, setUsers } = usersSlice.actions

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    const newUser = await userService.create(user)
    dispatch(appendUser(newUser))
  }
}

export default usersSlice.reducer
