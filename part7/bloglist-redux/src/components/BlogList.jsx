import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { List, ListItem } from '@mui/material'

const Bloglist = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogs = useSelector(({ blogs }) => {
    if (!blogs || blogs.length !== 0) {
      return blogs
    }
    return blogs.sort((a, b) => b.likes - a.likes)
  })

  return (
    <List>
      {blogs.map((blog) => (
        <ListItem key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </ListItem>
      ))}
    </List>
  )
}

export default Bloglist
