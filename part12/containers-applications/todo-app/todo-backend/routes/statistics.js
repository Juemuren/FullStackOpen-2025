const express = require('express');
const redis = require('../redis')
const router = express.Router();

/* GET todos usage metadata. */
router.get('/', async (_, res) => {
  const add_todos = await redis.getAsync('add_todos') || 0
  res.send({ add_todos: Number(add_todos) });
});

module.exports = router;
