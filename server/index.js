const express= require('express');
const app= express();
const http = require('http');
const {Server}= require('socket.io');
const cors= require('cors');
const bodyParser= require("body-parser");
const gmailService=require('./gmailService');
const whatsappService = require('./whatsappService');
// const WHwhatsapp= require('./webhooks/whatsapp')
require('dotenv').config();
// const logger=require('./logger')

process.on('uncaughtException', (err) => {
    console.warn('UNCAUGHT EXCEPTION!');
    console.log(err.message);
    process.exit(1);
  });



  

app.use(cors());

const server= http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
        
    }
})
//middleware to read texts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api', (req,res)=>{
    //     res.send({"users":["user 1", "user 2"]})
    // })
    
    
    
io.on("connection", (socket)=>{
    console.log(`user connected:${socket.id}`)
    
    socket.on("sendMessage: ",(message)=>{
        const messagewithSender={...message,sender:socket.id};
        io.emit("message",messagewithSender)
        console.log(message)
    })  
    
});

app.listen(8000,()=>{
    console.log(`server is running on port 8000...`)
});

app.post('/sendMessage',async(req,res)=>{
   try {
    const {sendMessage}= req.body
    console.log('received',sendMessage)


    await whatsappService.sendMessage(sendMessage)

    res.sendStatus(200)
   } catch (error) {
    console.error(error)
   }
})   

app.get('/',async(req,res)=>{
    res.send('welcome to the api')
})

app.get('/facebooklogin', async(req,res)=>{
    
    res.send('you have logged into facebook successfully')
})
app.get('/instagramlogin', async(req,res)=>{
    
    res.send('you have logged into instagram successfully')
})
app.get('/whatsapp',async(req, res)=>{
    res.send(`${process.env.WHATSAPP_VERIFY_TOKEN}`)
})


// app.get('/login/facebook',passport.authenticate('facebook',{scope:['email']}));

// app.get('/facebook', passport.authenticate('facebook',(req,res)=>{
//     res.redirect('/fb')
// }))
            
                
app.get('/',gmailService)
app.use('/api', gmailService)


// app.post('/webhook',WHwhatsapp.recieveMessage)


// app.post("/whatsapp/webhook",wappWH.recieveMessage );
// app.get("/whatsapp/webhook",wappWH.messageStatus );

// app.get('/auth/facebook',passport.authenticate('facebook'));



// app.get('/auth/facebook/callback',passport.authenticate('facebook',{ failureRedirect: '/login' }),(req,res)=>{
//     res.redirect('/')
// })


// app.get('/',(req,res)=>{
//     res.send(`${req.user.displayName}`)
// })


app.post('/webhook', async (req, res) => {
// Log incoming messages
console.log('Incoming webhook message:', JSON.stringify(req.body, null, 2));

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
        Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
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

res.sendStatus(200);
});
  
  // Webhook verification
app.get('/webhook', (req, res) => {
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
});