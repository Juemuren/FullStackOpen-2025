import { useState } from "react"

const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    addBlog(blogObject)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input value={url} onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm