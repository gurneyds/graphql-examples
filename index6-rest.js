const { ApolloServer, gql } = require('apollo-server')
const BooksAPI = require('./services/BooksAPI')
const AuthorsAPI = require('./services/AuthorsAPI')

const typeDefs = gql`
  type Query {
    getMessage(params: String): String!
    getAuthors(params: AuthorInput): [Author]
    getBooks(params: BookInput): [Book]
    searchBooks(params: BookInput): [Book]
  }

  type Author {
    id: ID!
    name: String
    biography: String
    birthday: String
  }

  type Book {
    author: String
    id: ID!
    title: String
  }

  input AuthorInput {
    id: ID
    name: String
    biography: String
    birthday: String
  }

  input BookInput {
    title: String
    author: String
    id: ID
  }

  type Mutation {
    addAuthor(params: AuthorInput): Author!
    addBook(params: BookInput): Book!
    updateBook(params: BookInput): Book!
    updateAuthor(params: AuthorInput): Author!
    deleteBook(params: ID!): ID!
    deleteAuthor(params: ID!): ID!
  }
`

const resolvers = {
  Mutation: {
    addAuthor: async (_, { params: authorInput }, { dataSources }) => {
      return await dataSources.authorsAPI.addAuthor(authorInput)
    },
    addBook: async (_, { params: bookInput }, { dataSources }) => {
      const author = await dataSources.authorsAPI.addUpdateAuthor(
        bookInput.author,
      )

      // Put the newly created author's id into the book input so it will be there when the book is created1
      bookInput.authorId = author.id

      // Remove the author since it is now dereferenced into the authors API
      delete bookInput.author

      return await dataSources.booksAPI.addBook(bookInput)
    },
    deleteBook: async (_, { params: id }, { dataSources }) => {
      return await dataSources.booksAPI.deleteBook(id)
    },
    deleteAuthor: async (_, { params: id }, { dataSources }) => {
      return await dataSources.authorsAPI.deleteAuthor(id)
    },
    updateBook: async (_, { params: bookInput }, { dataSources }) => {
      let author

      // Find the author by name or create a new author so that we have the author id
      if (bookInput.author) {
        author = await dataSources.authorsAPI.addUpdateAuthor(bookInput.author)
        bookInput.authorId = author.id
      }

      const book = await dataSources.booksAPI.updateBook(bookInput)
      return book
    },
    updateAuthor: async (_, { params: authorInput }, { dataSources }) => {
      return await dataSources.authorsAPI.updateAuthor(authorInput)
    },
  },
  Query: {
    getMessage: (_, { params }) => {
      return `Hello ${params || ''}`
    },
    getAuthors: async (_, { params }, { dataSources }) => {
      return await dataSources.authorsAPI.getAuthors(params)
    },
    // Query to return the books with optional parameters to filter which books to return
    getBooks: async (_, { params: bookInput }, { dataSources }) => {
      return await dataSources.booksAPI.getBooks(bookInput)
    },
  },
  Book: {
    author: async (parent, args, context) => {
      if (parent.authorId) {
        const author = await context.dataSources.authorsAPI.getAuthorById(
          parent.authorId,
        )
        return author.name
      } else {
        return null
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    booksAPI: new BooksAPI('http://localhost:3000/'),
    authorsAPI: new AuthorsAPI('http://localhost:3000/'),
  }),
})

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
