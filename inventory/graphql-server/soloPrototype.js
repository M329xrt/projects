 import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// hardcoded data store representing Northstar's stock
const inventory = [
  { id: "1", sku: "NS-100", name: "Denim Jacket", quantity: 50 },
  { id: "2", sku: "NS-200", name: "Classic Tee", quantity: 120 },
  { id: "3", sku: "NS-300", name: "Maxi Dress", quantity:15 },
  { id: "4", sku: "NS-400", name: "Wide leg Denim Pants", quantity:30 },
  { id: "5", sku: "NS-500", name: "Hoodie", quantity:7 },
  { id: "6", sku: "NS-600", name: "Long sleeve top", quantity:66},
  { id: "7", sku: "NS-700", name: "boys wide leg cargo pants", quantity:44},
];

// 1. The Schema Contract (Types & Operations)
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

  type Mutation {
    updateInventory(sku: String!, quantity: Int!): Product
  }
`;

// 2. The Resolvers (The code that fetches and updates data)
const resolvers = {
  Query: {
    productBySku: (parent, args) => {
      return inventory.find(item => item.sku === args.sku);
    }
  },
  Mutation: {
    updateInventory: (parent, args) => {
      const item = inventory.find(item => item.sku === args.sku);
      if (!item) return null;
      item.quantity = args.quantity;
      return item;
    }
  }
};

// 3. Server Startup Execution
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Prototype ready at: ${url}`);

