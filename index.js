import express from 'express';
import bodyParser from 'body-parser';
import sendImage from "./routes/sendImage.js" 

const app = express();
const PORT = 3000;

const VERIFY_TOKEN = 'Biriyani'; // must match what you put in Meta's dashboard

app.use(bodyParser.json());
app.use(express.json())
app.use('/image',sendImage)
/**
 * Webhook verification endpoint (GET)
 */

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed');
    res.sendStatus(403);
  }
});

/**
 * Webhook listener endpoint (POST)
 */
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.entry) {
    for (const entry of body.entry) {
      const changes = entry.changes || [];

      for (const change of changes) {
        const value = change.value;

        if (value?.statuses) {
          for (const statusObj of value.statuses) {
            const {
              id, // wamid
              status, // sent, delivered, read, failed
              timestamp,
              recipient_id,
              conversation,
              pricing,
            } = statusObj;

            console.log('📨 Message ID (wamid):', id);
            console.log('📦 Status:', status);
            console.log('📱 Recipient ID:', recipient_id);
            console.log('⏰ Timestamp:', timestamp);
            if (conversation) {
              console.log('🧾 Conversation ID:', conversation.id);
            }
            if (pricing) {
              console.log('💰 Pricing:', pricing);
            }

            // TODO: Save this to DB or trigger another action
          }
        }
      }
    }

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 WhatsApp Webhook Server running on http://localhost:${PORT}`);
});
