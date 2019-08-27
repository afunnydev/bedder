const { ApolloServer } = require("apollo-server");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const { importSchema } = require("graphql-import");

const typeDefs = importSchema("src/schema.graphql");

// Create the GraphQL Yoga Server

function createServer() {
  return new ApolloServer({ 
    typeDefs, 
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";

      // add the token to the context
      return { token };
    },
    cors: {
      credentials: true,
      origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    },
    introspection: true
  });
}

module.exports = createServer;
