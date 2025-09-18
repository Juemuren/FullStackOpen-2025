import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'

import BlogComment from './BlogComment'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === match.params.id))
  const user = useSelector(({ user }) => user)

  if (!blog) {
    return null
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username && <button onClick={handleRemove}>remove</button>}
      <BlogComment comments={blog.comments} />
    </div>
  )
}

export default BlogInfo
