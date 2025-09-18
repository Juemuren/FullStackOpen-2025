import { useDispatch } from 'react-redux'

import { logout } from '../reducers/userReducer'

const Logout = ({ name }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <p>{name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Logout
