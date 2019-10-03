const { ApolloServer, gql } = require('apollo-server')

// Simple JSON to simulate a back-end data provider
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

// Add a Book data type to return the book information
const typeDefs = gql`
  type Query {
    getMessage(params: String): String!
    getBooks(params: BookInput): [Book]
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
`

const resolvers = {
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
