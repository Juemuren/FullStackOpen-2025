const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})

      return books
    },
    allAuthors: async () => await Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findById(root)
      const books = await Book.find({ author: author.id })
      return books.length
    },
    born: async (root) => {
      const author = await Author.findById(root)
      return author.born
    },
    name: async (root) => {
      const author = await Author.findById(root)
      return author.name
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.author })

      if (!foundAuthor) {
        const author = new Author({ name: args.author })
        await author.save()
      }

      const bookAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: bookAuthor })

      await book.save()

      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
