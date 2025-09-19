import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'

import BlogComment from './BlogComment'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

import { Button, Card } from '@mui/material'

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
    <Card>
      <h3>
        {blog.title} {blog.author}
      </h3>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button onClick={handleLike}>like</Button>
      </div>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username && <Button onClick={handleRemove}>remove</Button>}
      <BlogComment id={blog.id} comments={blog.comments} />
    </Card>
  )
}

export default BlogInfo
