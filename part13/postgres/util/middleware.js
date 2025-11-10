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

module.exports = {
  errorHandle
}