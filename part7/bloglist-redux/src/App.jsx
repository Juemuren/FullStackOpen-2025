import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import BlogView from './components/BlogView'
import UserView from './components/UserView'

import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
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
      </Routes>
    </div>
  )
}

export default App
