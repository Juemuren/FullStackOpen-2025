/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Bloglist from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

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
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage("wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteOne(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const likeBlog = async (id, blogObject) => {
    const likedBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(b => b.id !== id ? b : {...b, likes: likedBlog.likes}))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      {user === null ?
        <LoginForm login={login} /> :
        <div>
          <h2>blogs</h2>
          <Logout name={user.name} logout={logout} />
          {blogForm()}
          <Bloglist
            user={user}
            blogs={blogs}
            updateBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        </div>
      }
    </div>
  )
}

export default App