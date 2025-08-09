import Blog from "./Blog"

const Bloglist = ({blogs, updateBlog}) => {
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default Bloglist