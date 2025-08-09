import Blog from "./Blog"

const Bloglist = ({blogs, updateBlog}) => {

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default Bloglist