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
      let query = {}
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author })
        query = { ...query, author: foundAuthor.id }
      }
      if (args.genre) {
        query = { ...query, genres: { $in: [args.genre] } }
      }

      return await Book.find(query)
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
      let book

      if (!foundAuthor) {
        const author = new Author({ name: args.author })
        await author.save()
        book = new Book({ ...args, author: author })
      } else {
        book = new Book({ ...args, author: foundAuthor })
      }

      await book.save()
      return book
    },
    editAuthor: async (root, args) => {
      const filter = { name: args.name }
      const update = { born: args.setBornTo }

      const author = await Author.findOneAndUpdate(filter, update, { new: true })
      return author
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
