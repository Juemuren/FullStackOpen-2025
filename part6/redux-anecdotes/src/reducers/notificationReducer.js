import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (text, second) => {
  return dispatch => {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, second * 1000)
  }
}

export default notificationSlice.reducer