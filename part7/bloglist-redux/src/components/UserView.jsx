import { useSelector } from 'react-redux'

import UserBlogCount from './UserBlogCount'

const UserView = () => {
  const users = useSelector(({ users }) => users)

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
          {users.map((user) => (
            <UserBlogCount key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserView
