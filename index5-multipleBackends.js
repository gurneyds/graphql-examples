const { ApolloServer, gql } = require('apollo-server')
const bookService = require('./bookService')
const authorService = require('./authorService')

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
    updateBook(params: BookInput): Book! # Update an existing book, return the updated book
    deleteBook(params: ID!): Book! # Delete a book by ID, return the deleted book
  }
`

const resolvers = {
  Mutation: {
    addAuthor: (_, { params: authorInput }, { dataSources }) => {
      return dataSources.authorService.addAuthor(authorInput)
    },
    addBook: (_, { params: bookInput }, { dataSources }) => {
      // Create a new author - ideally we would check for an existing author first - but for simlicity just creating a new author
      const newAuthor = dataSources.authorService.addAuthor({
        name: bookInput.author,
      })

      // Put the newly created author's id into the book input so it will be there when the book is created1
      bookInput.authorId = newAuthor.id
      return dataSources.bookService.addBook(bookInput)
    },
    deleteBook: (_, { params: id }, { dataSources }) => {
      return dataSources.bookService.deleteBook(id)
    },
    updateBook: (_, { params: bookInput }, { dataSources }) => {
      return dataSources.bookService.updateBook(bookInput)
    },
  },
  Query: {
    getMessage: (_, { params }) => {
      return `Hello ${params || ''}`
    },
    getAuthors: (_, __, { dataSources }) => {
      return dataSources.authorService.getAuthors()
    },
    // Query to return the books with optional parameters to filter which books to return
    getBooks: (_, { params: bookInput }, { dataSources }) => {
      return dataSources.bookService.getBooks(bookInput)
    },
  },
  Book: {
    author: (parent, args, context) => {
      return context.dataSources.authorService.getAuthorName(parent.authorId)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookService,
    authorService,
  }),
})

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
