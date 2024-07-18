const fs= require('fs')
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
// const http= require('http');
// const server= http.createServer(app)
// const socketIo= require('socket.io');
// const io= socketIo(server)






// Webhook to handle incoming messages
const receiveMessage= async (req, res) => {
  // Log incoming messages
  const response=JSON.stringify(req.body, null, 2);

  fs.appendFile('./message.txt', response, (err) => {
    if (err) {
      console.error('Error appending to file', err);
    } else {
      console.log('Data has been appended to file');
    }
  });
  
  console.log('Incoming webhook message:', JSON.stringify(req.body, null, 2));
  
  // Check if the webhook request contains a message
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  

  // Check if the incoming message contains text
  //message?.type === 'text'
  if (message) {
    // Extract the business number to send the reply from it
    // const business_phone_number_id = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    try {
      
        const from = message.from; // Sender ID
        const text = message.text?.body; // Text message content
    
        console.log(`Message from ${from}: ${text}`);
        // Emit the message to all connected clients
        const io = req.app.get('socketio');

        if(io){
          io.emit('newMessage', { from, text });
        }else{
          console.error('io not initialized')
        }
        
    } catch (error) {
      console.error('Error sending reply:', error);
    }

    try {
      // Mark incoming message as read
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${process.env.Version}/${process.env.Phone_Number_ID}/messages`,
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