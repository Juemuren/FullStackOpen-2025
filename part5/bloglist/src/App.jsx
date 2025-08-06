import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
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
        <Bloglist blogs={blogs} user={user} setUser={setUser} />
      }
    </div>
  )
}

export default App