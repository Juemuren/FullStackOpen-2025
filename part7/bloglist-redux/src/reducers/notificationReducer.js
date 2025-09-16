import { createSlice } from '@reduxjs/toolkit'

const initNotification = {
  text: null,
  type: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initNotification,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initNotification
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (text, second, type) => {
  return (dispatch) => {
    dispatch(
      setNotification({
        text: text,
        type: type,
      })
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, second * 1000)
  }
}

export default notificationSlice.reducer
