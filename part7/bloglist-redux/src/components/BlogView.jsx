import { useRef } from 'react'
import { useSelector } from 'react-redux'

import LoginForm from './LoginForm'
import Logout from './Logout'
import BlogForm from './BlogForm'
import Bloglist from './BlogList'
import Togglable from './Togglable'

const BlogView = () => {
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Logout name={user.name} />
      {blogForm()}
      <Bloglist user={user} />
    </div>
  )
}

export default BlogView
