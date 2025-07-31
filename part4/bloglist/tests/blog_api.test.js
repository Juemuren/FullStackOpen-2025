const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('api test', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs has id field', async() => {
    const response = await api.get('/api/blogs')
    assert(response.body.map(b => Object.hasOwn(b, 'id')))
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Me',
      url: 'https://fullstackopen.com/',
      likes: 114514,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Test Blog'))
  })

  test('the likes of a blog default to be zero', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Me',
      url: 'https://fullstackopen.com/'
    }

    const response = await api.post('/api/blogs').send(newBlog)
    assert(response.body.likes === 0)
  })

  test('a blog without title is bad', async () => {
    const newBlog = {
      author: 'Me',
      url: 'https://fullstackopen.com/',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('a blog without url is bad', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Me',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})