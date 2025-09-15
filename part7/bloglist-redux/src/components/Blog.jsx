import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [show, setShow] = useState(false)

  const buttonLable = show === false ? 'view' : 'hide'

  const changeShow = () => {
    setShow(!show)
  }

  const handleLike = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    updateBlog(blog.id, blogObject)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blog" data-likes={blog.likes}>
      <div>
        {blog.title} {blog.author}
        <button onClick={changeShow}>{buttonLable}</button>
      </div>
      {show === true && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
