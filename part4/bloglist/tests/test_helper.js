const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const initialUser = {
  username: "root",
  name: "test bot",
  password: "114514"
}

const initializeUser = async (initialUser) => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(initialUser.password, 10)
  const user = new User({
    username: initialUser.username,
    name: initialUser.name,
    blogs: [],
    passwordHash
  })

  await user.save()
}

const initializeBlogs = async (initialBlogs) => {
  await Blog.deleteMany({})

  const users = await User.find({})
  const user = users[0]

  const blogs = initialBlogs.map(blog => new Blog({
    ...blog,
    user: user._id.toString(),
  }))

  const promiseArray = blogs.map(blog => blog.save())
  await Promise.all(promiseArray)

  await initializeUserAfterBlogs()
}

const initializeUserAfterBlogs = async () => {
  const blogs = await Blog.find({})
  const users = await User.find({})
  const user = users[0]

  user.blogs = blogs.map(blog => blog._id)

  await user.save()
}

const getHeaderFor = async (initialUser) => {
  const user = {
    username: initialUser.username,
    password: initialUser.password
  }

  const loginUser = await api
    .post('/api/login')
    .send(user)
  
  const header = { 'Authorization': `Bearer ${loginUser.body.token}` }
  return header
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'will remove this soon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  initializeBlogs,
  initialUser,
  initializeUser,
  getHeaderFor,
  nonExistingId,
  blogsInDb
}