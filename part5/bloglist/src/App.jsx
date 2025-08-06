import { useState, useEffect } from 'react'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Bloglist from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

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
      {user === null ?
        <LoginForm setUser={setUser} /> :
        <div>
          <h2>blogs</h2>
          <Logout user={user} setUser={setUser} />
          <BlogForm blogs={blogs} setBlogs={setBlogs}/>
          <Bloglist blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App