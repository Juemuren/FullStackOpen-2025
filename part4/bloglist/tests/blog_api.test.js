const { test, after, beforeEach, before, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

before(async () => {
  await helper.initializeUser(helper.initialUser)
})

describe('blog api test', () => {
  beforeEach(async () => {
    await helper.initializeBlogs(helper.initialBlogs)
  })

  describe('blog get test', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('blogs have id field', async() => {
      const response = await api.get('/api/blogs')
      assert(response.body.map(b => Object.hasOwn(b, 'id')))
    })
  })

  describe('blog post test', async () => {
    test('a valid blog can be added', async () => {
      const header = await helper.getHeaderFor(helper.initialUser)
      const newBlog = {
        title: 'Test Blog',
        author: 'Me',
        url: 'https://fullstackopen.com/',
        likes: 114514,
      }

      await api
        .post('/api/blogs')
        .set(header)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('Test Blog'))
    })

    test('the likes of a blog default to be zero', async () => {
      const header = await helper.getHeaderFor(helper.initialUser)
      const newBlog = {
        title: 'Test Blog',
        author: 'Me',
        url: 'https://fullstackopen.com/'
      }

      const response = await api
        .post('/api/blogs')
        .set(header)
        .send(newBlog)

      assert(response.body.likes === 0)
    })

    test('a blog without title is bad', async () => {
      const header = await helper.getHeaderFor(helper.initialUser)
      const newBlog = {
        author: 'Me',
        url: 'https://fullstackopen.com/',
        likes: 100
      }

      await api
        .post('/api/blogs')
        .set(header)
        .send(newBlog)
        .expect(400)
    })

    test('a blog without url is bad', async () => {
      const header = await helper.getHeaderFor(helper.initialUser)
      const newBlog = {
        title: 'Test Blog',
        author: 'Me',
        likes: 100
      }

      await api
        .post('/api/blogs')
        .set(header)
        .send(newBlog)
        .expect(400)
    })

    test('a request without token is bad', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Me',
        url: 'https://fullstackopen.com/',
        likes: 114514,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })
  })

  describe('blog delete test', () => {
    test('can delete a blog if id is valid', async () => {
      const header = await helper.getHeaderFor(helper.initialUser)
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(header)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe('blog put test', () => {
    test('can update a blog title if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newBlog = { ...blogToUpdate, title: 'Updated Blog' }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToUpdate.title))
      assert(titles.includes(newBlog.title))
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})