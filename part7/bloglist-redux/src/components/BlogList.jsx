import { useSelector } from 'react-redux'

import Blog from './Blog'

const Bloglist = ({ user }) => {
  const blogs = useSelector(({ blogs }) => {
    if (!blogs || blogs.length !== 0) {
      return blogs
    }

    return blogs.sort((a, b) => b.likes - a.likes)
  })

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} />
      ))}
    </div>
  )
}

export default Bloglist
