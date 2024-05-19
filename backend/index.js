const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
   
  const { url } = await startStandaloneServer(server)
   
  console.log(`🚀 Server ready at ${url}`)