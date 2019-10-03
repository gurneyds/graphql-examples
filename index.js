const { ApolloServer, gql } = require('apollo-server')

// Define a query that can be run with optional parameters
// Must return a string
const typeDefs = gql`
  type Query {
    getMessage(params: String): String!
  }
`

// Define the code that will be run when the 'getMessage' query is requested
const resolvers = {
  Query: {
    getMessage: (_, { params }) => {
      return `Hello ${params || ''}`
    },
  },
}

// Creates the ApolloServer with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Listen for incoming query requests on port 4000
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
