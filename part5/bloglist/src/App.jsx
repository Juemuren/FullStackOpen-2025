import { useState, useEffect } from 'react'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Bloglist from './components/BlogList'
import Notification from './components/Notification'

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

  return (
    <div>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      {user === null ?
        <LoginForm
          setUser={setUser}
          setErrorMessage={setErrorMessage}
        /> :
        <div>
          <h2>blogs</h2>
          <Logout
            user={user}
            setUser={setUser}
          />
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setSuccessMessage={setSuccessMessage}
          />
          <Bloglist blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App