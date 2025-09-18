import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Bloglist
