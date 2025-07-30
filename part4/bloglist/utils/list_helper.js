const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, current) => {
    return current.likes > max.likes ? current : max
  }

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? null
    : _.chain(blogs)
      .countBy('author')
      .map((blogs, author) => ({author, blogs}))
      .maxBy('blogs')
      .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}