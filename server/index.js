const express= require('express');
const app= express();
const http = require('http');
const {Server}= require('socket.io');
const cors= require('cors');
const bodyParser= require("body-parser");
const gmailService=require('./gmailService');
const WHfacebook=require('./webhooks/messengerFB')
const WHwhatsapp= require('./webhooks/whatsapp')
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
    res.status(200).json({ token: process.env.WHATSAPP_VERIFY_TOKEN })
})

//////////////////////////////////////////////////////       
                
app.get('/',gmailService)
app.use('/api', gmailService)


////////////////////////////////////////////////////////////////////


app.post("/webhook",WHwhatsapp.receiveMessage );
app.get("/webhook",WHwhatsapp.verifyWebhook );


///////////////////////////////////////////////////////////////////////////
app.get('/auth/callback', (req, res) => {
    const accessToken = req.query.access_token;
    // Store the access token in your database or session
    console.log('Access Token:', accessToken);
    res.send('Login successful! You can close this window.');
});

/////////////////////////////////////////////////////////////////////////
app.post("/fbwebhook",WHfacebook.receiveMessage );
app.get("/fbwebhook",WHfacebook.verifyWebhook )
