import { useSelector } from 'react-redux'

import UserBlogCount from './UserBlogCount'

const UserView = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  const countByName = blogs.reduce((acc, blog) => {
    const name = blog.user.name
    acc[name] = (acc[name] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(countByName).map(([name, count]) => (
            <UserBlogCount key={name} name={name} count={count} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserView
