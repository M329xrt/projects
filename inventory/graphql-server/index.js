import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { inventoryCache } from './cache.js'; 
import { runPollingWorker } from './pollingWorker.js'; 


// GraphQL Setup

const typeDefs = `#graphql
  type Product {
    id: ID!
    sku: String!
    name: String!
    quantity: Int!
  }

  type Query {
    productBySku(sku: String!): Product
  }
`;

const resolvers = {
  Query: {
    productBySku: (parent, args) => {
      // Pull live data straight out of the shared cache module
      return inventoryCache.get(args.sku) || null;
    }
  }
};


// initialization

// Boot up the visual GraphQL query server
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Client Query Endpoint live at: ${url}`);


await runPollingWorker();

const FIVE_MINUTES = 5 * 60 * 1000;
setInterval(runPollingWorker, FIVE_MINUTES);
