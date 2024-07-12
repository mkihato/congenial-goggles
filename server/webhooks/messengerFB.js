const fs= require('fs')
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

// Webhook verification
const verifyWebhook= (req, res) => {

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check the mode and token sent are correct
  if (mode === 'subscribe' && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    // Respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log('Webhook verified successfully!');
  } else {
    // Respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
};

// Webhook to handle incoming messages
const receiveMessage= async (req, res) => {
  const body= req.body;
  
  if(body=== 'page'){
    
    res.send(200).send('Event has been received')
    console.log(body)
  }else{
    res.sendStatus(404)
  }
};

module.exports={verifyWebhook, receiveMessage}