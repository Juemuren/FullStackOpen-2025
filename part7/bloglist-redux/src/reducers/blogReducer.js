import { createSlice } from '@reduxjs/toolkit'

// import loginService from '../services/login'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlog } = blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer
