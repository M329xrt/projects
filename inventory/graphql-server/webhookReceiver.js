import express from 'express';
import { attendeeCache } from './cache.js';

const app = express();
app.use(express.json());

/**
 * Solstice Async Webhook Receiver Callback Endpoint
 */
app.post('/api/print-callback', (req, res) => {
  const { qrCode, printSuccess } = req.body;
  const attendee = attendeeCache.get(qrCode);

  if (!attendee) {
    return res.status(404).json({ error: "Attendee record missing from cache store." });
  }

  if (printSuccess) {
    // Transition status to finalized state machines
    attendee.status = 'PRINT_COMPLETED';
    attendeeCache.set(qrCode, attendee);
    console.log(`[Webhook Receipt]  Confirmation arrived! ${attendee.name}'s badge is officially printed.`);
  }

  return res.status(200).json({ status: "processed" });
});

app.listen(5000, () => {
  console.log(` Webhook Callback Server active on port 5000`);
});
