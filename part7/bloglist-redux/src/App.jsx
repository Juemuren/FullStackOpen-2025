import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import BlogView from './components/BlogView'
import UserView from './components/UserView'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  })

  useEffect(() => {
    dispatch(initUsers())
  })

  useEffect(() => {
    dispatch(initUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <LoginInfo />
      <Routes>
        <Route path="/" element={<BlogView />} />
        <Route path="/users" element={<UserView />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/blogs/:id" element={<BlogInfo />} />
      </Routes>
    </div>
  )
}

export default App
