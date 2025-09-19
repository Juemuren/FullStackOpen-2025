import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    setBlog(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    },
  },
})

export const { appendBlog, removeBlog, setBlog, updateBlog } = blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    await blogService.create(newBlog)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteOne(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(blog.id, likedBlog)
    dispatch(updateBlog(likedBlog))
  }
}

export const commentBlog = (id, content) => {
  return async (dispatch) => {
    const comment = {
      content,
    }
    const newBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(newBlog))
  }
}

export default blogSlice.reducer
