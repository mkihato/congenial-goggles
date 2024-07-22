const fs= require('fs')
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());



const VERIFY_TOKEN= process.env.FACEBOOK_VERIFY_TOKEN
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Webhook verification
const verifyWebhook= (req, res) => {

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check the mode and token sent are correct
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    // Respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log('FB Webhook verified successfully!');
    
  } else {
    // Respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
};

// Webhook to handle incoming messages
const receiveMessage= async (req, res) => {
  let body= req.body;
  console.log(body)

  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Gets the body of the webhook event
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      // Check if sender is defined
      if (!webhookEvent.sender || !webhookEvent.sender.id) {
        console.error('Webhook event does not contain sender.id');
        return res.status(400).send('Webhook event missing sender.id');
      }

      // Get the sender PSID
      let senderPsid = webhookEvent.sender.id;
      console.log('Sender PSID: ' + senderPsid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
  
  // if(body.object === 'page'){
  //   // Iterates over each entry - there may be multiple if batched
  //   body.entry.forEach(function(entry) {

  //     // Gets the body of the webhook event
  //     let webhookEvent = entry.messaging[0];
  //     console.log(webhookEvent);

  //     // Get the sender PSID
  //     let senderPsid = webhookEvent.sender.id;
  //     console.log('Sender PSID: ' + senderPsid);

  //     // Check if the event is a message or postback and
  //     // pass the event to the appropriate handler function
  //     if (webhookEvent.message) {
  //       handleMessage(senderPsid, webhookEvent.message);
  //     } else if (webhookEvent.postback) {
  //       handlePostback(senderPsid, webhookEvent.postback);
  //     }
  //   });

  //   // Returns a '200 OK' response to all requests
  //   res.status(200).send('EVENT_RECEIVED');

  // }else{
  //   // Returns a '404 Not Found' if event is not from a page subscription
  //   res.sendStatus(404);
  // }
  
};

function handleMessage (senderPsid, receivedMessage) {
  let response;


  // Checks if the message contains text
  // if (receivedMessage.text) {
  //   // Create the payload for a basic text message, which
  //   // will be added to the body of your request to the Send API
  //   response = {
  //     'text': `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`
  //   };
  // } else if (receivedMessage.attachments) {

  //   // Get the URL of the message attachment
  //   let attachmentUrl = receivedMessage.attachments[0].payload.url;
  //   response = {
  //     'attachment': {
  //       'type': 'template',
  //       'payload': {
  //         'template_type': 'generic',
  //         'elements': [{
  //           'title': 'Is this the right picture?',
  //           'subtitle': 'Tap a button to answer.',
  //           'image_url': attachmentUrl,
  //           'buttons': [
  //             {
  //               'type': 'postback',
  //               'title': 'Yes!',
  //               'payload': 'yes',
  //             },
  //             {
  //               'type': 'postback',
  //               'title': 'No!',
  //               'payload': 'no',
  //             }
  //           ],
  //         }]
  //       }
  //     }
  //   };
  // }
  if(receivedMessage.text){
    response = {
          'text': `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`
        };
    try {
      
     callSendAPI(senderPsid, response);
    } catch (error) {
      console.error(error.response)
    }
  }else{

  }

  // Send the response message
  
}

// Handles messaging_postbacks events
function handlePostback(senderPsid, receivedPostback) {
  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { 'text': 'Thanks!' };
  } else if (payload === 'no') {
    response = { 'text': 'Oops, try sending another image.' };
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response);
}

// Sends response messages via the Send API
const callSendAPI=async (senderPsid, response)=>{

  // The page access token we have generated in your app settings
  

  // Construct the message body
  let requestBody = {
    'recipient': {
      'id': senderPsid
    },
    'message': response
  };
  try {
    await axios({
      method: 'POST',
      url: `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      data: requestBody,
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error.response.data);
  }
  // Send the HTTP request to the Messenger Platform
  // request({
  //   'uri': 'https://graph.facebook.com/v20.0/me/messages',
  //   'qs': { 'access_token': PAGE_ACCESS_TOKEN },
  //   'method': 'POST',
  //   'json': requestBody
  // }, (err, _res, _body) => {
  //   if (!err) {
  //     console.log('Message sent!');
  //   } else {
  //     console.error('Unable to send message:' + err);
  //   }
  // });
}





module.exports={verifyWebhook, receiveMessage}