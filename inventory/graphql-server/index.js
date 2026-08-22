import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import amqp from 'amqplib';
import express from 'express';
import { attendeeCache } from './cache.js';

const QUEUE_NAME = 'badge_print_jobs';
let rabbitChannel = null;

// Initialize connection to RabbitMQ Broker
async function initRabbitMQ() {
  try {
    // Connects locally. (If your team uses a cloud broker instance, swap this string with your amqp:// url)
    const connection = await amqp.connect('amqp://localhost');
    rabbitChannel = await connection.createChannel();
    await rabbitChannel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Connected to RabbitMQ: Queue '${QUEUE_NAME}' is active.`);
  } catch (error) {
    console.warn(" RabbitMQ Local Connection failed. (Log this error message in your Blocker Journal!)");
  }
}
//graphql setup
const typeDefs = `#graphql
  enum CheckInStatus {
    NOT_CHECKED_IN
    PENDING_PRINT
    PRINT_COMPLETED
  }

  type Attendee {
    qrCode: String!
    name: String!
    status: CheckInStatus!
  }

  type Query {
    getAttendee(qrCode: String!): Attendee
  }


  type Mutation {
    requestCheckIn(qrCode: String!): Attendee
  }
`;

const resolvers = {
  Query: {
    getAttendee: (_, { qrCode }) => attendeeCache.get(qrCode) || null,
  },
  // FIXED: Mutation must be an object enclosing your singular operation functions!
  Mutation: {
    requestCheckIn: async (_, { qrCode }) => {
      const attendee = attendeeCache.get(qrCode);
      if (!attendee) throw new Error("Attendee not registered for Solstice.");

      // Duplicate-Scan Protection Under the New Asynchronous Model
      if (attendee.status === 'PENDING_PRINT' || attendee.status === 'PRINT_COMPLETED') {
        console.warn(`Blocked duplicate scan for: ${attendee.name}. Current Status: ${attendee.status}`);
        return attendee;
      }

      // 1. Move local state instantly to PENDING_PRINT to secure the kiosk interface
      attendee.status = 'PENDING_PRINT';
      attendeeCache.set(qrCode, attendee);

      // 2. Publish payload directly into RabbitMQ Message Broker
      console.log(`[RabbitMQ Engine]  Publishing print request for ${attendee.name} to Broker...`);
      
      if (rabbitChannel) {
        const payload = JSON.stringify({ qrCode: attendee.qrCode, name: attendee.name });
        rabbitChannel.sendToQueue(QUEUE_NAME, Buffer.from(payload), { persistent: true });
      } else {
        console.error("Message skipped: RabbitMQ broker channel unavailable.");
      }

      return attendee;
    }
  }
};


const app = express();
app.use(express.json());

app.post('/api/print-callback', (req, res) => {
  const { qrCode, printSuccess } = req.body;
  const attendee = attendeeCache.get(qrCode);

  if (!attendee) {
    return res.status(404).json({ error: "Attendee record missing from cache store." });
  }

  if (printSuccess) {
    attendee.status = 'PRINT_COMPLETED';
    attendeeCache.set(qrCode, attendee);
    console.log(`[Webhook Receipt] ⚡ Confirmation arrived! ${attendee.name}'s badge is officially printed.`);
  }

  return res.status(200).json({ status: "processed" });
});



// Orchestrate boot
await initRabbitMQ();

app.listen(5000, () => {
  console.log(`🔌 Webhook Callback Ingestion active on port 5000`);
});

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`GraphQL Check-In Kiosk Service running at: ${url}`);
