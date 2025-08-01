const { test, describe } = require('node:test')
const assert = require('node:assert')

const dummy = (blogs) => {
  return 1
}

describe('dummy test', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    assert.strictEqual(result, 1)
  })
})