const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const errorHandle = (error, req, res, next) => {
  console.error(error)

  switch (error.name) {
    case 'SequelizeDatabaseError':
      return res.status(404).json({ error: 'type error' })
    case 'SequelizeValidationError':
      return res.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandle,
  tokenExtractor
}