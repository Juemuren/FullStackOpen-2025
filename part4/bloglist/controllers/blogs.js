const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const blog = new Blog({
    ...request.body,
    user: request.user._id
  })

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  }
  if (!blog.likes) {
    blog.likes = 0
  }

  try {
    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(populatedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'user invalid' })
  }

  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter