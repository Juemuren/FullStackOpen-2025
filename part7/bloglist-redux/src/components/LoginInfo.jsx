import { useSelector } from 'react-redux'

import LoginForm from './LoginForm'
import Logout from './Logout'

const LoginInfo = () => {
  const user = useSelector((state) => state.user)

  if (user === null) {
    return <LoginForm />
  }

  return <Logout name={user.name} />
}

export default LoginInfo
