import { useRef } from 'react'
import { useSelector } from 'react-redux'

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

  return (
    <div>
      {blogForm()}
      <Bloglist user={user} />
    </div>
  )
}

export default BlogView
