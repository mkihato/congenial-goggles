const axios= require('axios');
require('dotenv').config();


async function sendMessage() {
  let data = JSON.stringify({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": `${process.env.Recipient_Number}`,
      "type": "text",
      "text": {
        "preview_url": true,
        "body": "its 7:00pm"
      }
    });
    
  let postConfig = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://graph.facebook.com/${process.env.Version}/${process.env.Phone_Number_ID}/messages`,
  headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${process.env.Token}`
  },
  data : data
  };

  try {
    const response = await axios.request(postConfig);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

module.exports= sendMessage();