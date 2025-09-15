import Blog from './Blog'

const Bloglist = ({ user, blogs, updateBlog, deleteBlog }) => {
  if (blogs.length !== 0) {
    blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      ))}
    </div>
  )
}

export default Bloglist
