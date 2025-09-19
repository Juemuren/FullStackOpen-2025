import { useDispatch } from 'react-redux'

import { logout } from '../reducers/userReducer'

import { Button } from '@mui/material'

const Logout = ({ name }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <>{name} logged in </>
      <Button onClick={handleLogout} color="inherit">
        logout
      </Button>
    </>
  )
}

export default Logout
