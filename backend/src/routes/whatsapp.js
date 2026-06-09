const express = require('express');
const router = express.Router();
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Constants from environment variables
const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

/**
 * GET /api/whatsapp/webhook
 * Verification endpoint for Meta Webhook setup.
 * Meta sends a GET request to verify that the webhook is valid.
 */
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WhatsApp Webhook Verified Successfully!');
      return res.status(200).send(challenge);
    }
    console.warn('WhatsApp Webhook Verification Failed: Token mismatch');
    return res.sendStatus(403);
  }
  return res.sendStatus(400);
});

/**
 * POST /api/whatsapp/webhook
 * Receives webhook notifications from Meta.
 */
router.post('/webhook', async (req, res) => {
  try {
    const { body } = req;
    console.log('Incoming Webhook POST Request:', JSON.stringify(body, null, 2));

    // Check if this is a message event
    if (
      body.object &&
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const messageObj = body.entry[0].changes[0].value.messages[0];
      const fromNumber = messageObj.from; // Sender's phone number
      const messageText = messageObj.text ? messageObj.text.body.trim() : '';

      console.log(`Received WhatsApp message from ${fromNumber}: "${messageText}"`);

      // Handle message asynchronously so we can reply 200 OK immediately
      handleIncomingMessage(fromNumber, messageText).catch(err => {
        console.error('Error handling WhatsApp message:', err.message);
      });
    }

    // Always respond 200 OK to Meta within 3 seconds to avoid retries
    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.error('Error in WhatsApp webhook endpoint:', error.message);
    res.status(500).send('ERROR');
  }
});

/**
 * Parses the user's intent and coordinates the response
 */
async function handleIncomingMessage(fromNumber, text) {
  const normalizedText = text.toLowerCase();

  // 1. Check if the user wants to TRACK a case
  if (normalizedText.includes('track') || normalizedText.startsWith('#avy-')) {
    // Extract case ID pattern (e.g. #AVY-20260608221532)
    const caseIdMatch = text.match(/#AVY-\d+/i);
    if (!caseIdMatch) {
      await sendWhatsAppMessage(
        fromNumber,
        "📋 *Case Status Tracking*\n\nPlease provide a valid Case ID.\nExample:\n*Track #AVY-202606082215*"
      );
      return;
    }

    const caseId = caseIdMatch[0].toUpperCase();
    await sendWhatsAppMessage(fromNumber, `🔍 Searching status for case ID *${caseId}*...`);

    try {
      // Query the database via Supabase
      const { data, error } = await supabase
        .from('orphan_cases')
        .select('*')
        .eq('case_id', caseId)
        .single();

      if (error || !data) {
        await sendWhatsAppMessage(
          fromNumber,
          `❌ *No Case Found*\n\nWe couldn't find any report matching ID *${caseId}*. Please check the ID and try again.`
        );
        return;
      }

      // Format case details
      const responseMessage = `📋 *Case Report Status Updates*

• *Case ID:* ${data.case_id}
• *Status:* ${data.status.toUpperCase()}
• *Location Sighted:* ${data.location || 'Not Specified'}
• *Date Logged:* ${data.date_of_sighting ? new Date(data.date_of_sighting).toLocaleDateString() : 'N/A'}
• *Description:* ${data.description || 'No description provided.'}

Thank you for helping us restore dignity.`;

      await sendWhatsAppMessage(fromNumber, responseMessage);
    } catch (dbError) {
      console.error('Database retrieval failed:', dbError);
      await sendWhatsAppMessage(fromNumber, "⚠️ An error occurred while retrieving case details. Please try again later.");
    }
    return;
  }

  // 2. Check if the user wants to REPORT a case
  if (normalizedText.includes('report') || normalizedText.includes('file')) {
    const webReportUrl = 'https://avyakta.netlify.app/report'; // Update to your production URL
    const responseMsg = `📢 *Report a Case*

To file a report with photos, location, and enable AI biometric matching, please use our secure portal:
🔗 ${webReportUrl}

If you cannot access the link, you can submit details by typing them here in chat.`;
    await sendWhatsAppMessage(fromNumber, responseMsg);
    return;
  }

  // 3. Fallback welcome message
  const welcomeText = `👋 *Welcome to Avyakta Portal Assistant*

I can assist you with case reporting and tracking.

• To *track* a case: Reply with your case ID (e.g. *Track #AVY-2026...*)
• To *report* a case: Reply *REPORT* to get the portal link.`;

  await sendWhatsAppMessage(fromNumber, welcomeText);
}

/**
 * Sends a text message to a user via the WhatsApp Cloud API
 */
async function sendWhatsAppMessage(to, text) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error('WhatsApp tokens/credentials are missing in environment variables.');
    return;
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: { preview_url: true, body: text }
      },
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`WhatsApp message successfully sent to ${to}`);
  } catch (error) {
    console.error('Error sending WhatsApp message via API:', error.response?.data || error.message);
  }
}

module.exports = router;
