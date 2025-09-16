import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Bloglist from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { showNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 5, 'error'))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  // const deleteBlog = async (id) => {
  //   await blogService.deleteOne(id)
  //   setBlogs(blogs.filter((b) => b.id !== id))
  // }

  // const likeBlog = async (id, blogObject) => {
  //   const likedBlog = await blogService.update(id, blogObject)
  //   setBlogs(blogs.map((b) => (b.id !== id ? b : { ...b, likes: likedBlog.likes })))
  // }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm login={login} />
      ) : (
        <div>
          <h2>blogs</h2>
          <Logout name={user.name} logout={logout} />
          {blogForm()}
          {/* <Bloglist user={user} blogs={blogs} updateBlog={likeBlog} deleteBlog={deleteBlog} /> */}
          <Bloglist user={user} />
        </div>
      )}
    </div>
  )
}

export default App
