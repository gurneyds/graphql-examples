const { ApolloServer, gql } = require('apollo-server')

const books = [
  {
    id: '1',
    title: 'Harry Potter and the Sorcers Stone',
    author: 'J.K. Rowling',
  },
  {
    id: '2',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id: '3',
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    id: '4',
    title: 'Airframe',
    author: 'Michael Crichton',
  },
]

const typeDefs = gql`
  type Query {
    getMessage(params: String): String!
    getBooks(params: BookInput): [Book]
    searchBooks(params: BookInput): [Book]
  }

  type Book {
    title: String
    author: String
    id: ID!
  }

  input BookInput {
    title: String
    author: String
    id: ID
  }

  type Mutation {
    addBook(params: BookInput): Book!
  }
`

const resolvers = {
  // Mutations are used whenever information is add, updated or deleted
  Mutation: {
    addBook: (_, { params: bookInput }) => {
      // Generate a random id and add the book to the collection
      bookInput.id = new Date().getTime().toString()
      books.push(bookInput)
      return bookInput
    },
  },
  Query: {
    getMessage: (_, { params }) => {
      return `Hello ${params || ''}`
    },
    // Query to return the books with optional parameters to filter which books to return
    getBooks: (_, { params }) => {
      // Filter by each key if found
      let returnedBooks = books
      ;['id', 'author', 'title'].forEach(key => {
        if (params && params[key]) {
          returnedBooks = returnedBooks.filter(
            book => book[key] === params[key],
          )
        }
      })

      return returnedBooks
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
