const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

// Webhook to handle incoming messages
const receiveMessage= async (req, res) => {
  // Log incoming messages
  console.log('Incoming webhook message:', JSON.stringify(req.body, null, 2));
  const response=JSON.stringify(req.body, null, 2)
  // Check if the webhook request contains a message
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  // Check if the incoming message contains text
  if (message?.type === 'text') {
    // Extract the business number to send the reply from it
    const business_phone_number_id = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    try {
      // Mark incoming message as read
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${process.env.Version}/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${process.env.Token}`,
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: message.id,
        },
      });
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  }

  res.status(200).json(response);
};

// Webhook verification
const verifyWebhook= (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check the mode and token sent are correct
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    // Respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log('Webhook verified successfully!');
  } else {
    // Respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
};

module.exports={verifyWebhook, receiveMessage}