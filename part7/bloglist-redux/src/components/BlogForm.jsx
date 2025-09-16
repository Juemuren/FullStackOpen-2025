import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(createBlog(blogObject))
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5, 'success'))
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input value={title} onChange={({ target }) => setTitle(target.value)} placeholder="write blog title here" />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write blog author here"
          />
        </div>
        <div>
          url:
          <input value={url} onChange={({ target }) => setUrl(target.value)} placeholder="write blog url here" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
