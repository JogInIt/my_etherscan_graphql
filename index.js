// Import ApolloServer from apollo-server
const { ApolloServer } = require("apollo-server");

// Import importSchema from graphql-import 
const { importSchema } = require("graphql-import");

// Import EtherDataSource 
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema from schema.graphql file
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file
require("dotenv").config();

// Define resolvers
const resolvers = {
  Query: {
    // Resolver for etherBalanceByAddress query
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for totalSupplyOfEther query    
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for latestEthereumPrice query
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for blockConfirmationTime query
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Define EtherDataSource data source
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0 to disable timeouts
server.timeout = 0;

// Start server and log URL 
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
