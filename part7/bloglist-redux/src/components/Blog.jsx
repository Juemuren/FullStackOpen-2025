import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ user, blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const buttonLable = show === false ? 'view' : 'hide'

  const changeShow = () => {
    setShow(!show)
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
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
