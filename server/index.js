const express= require('express');
const app= express();
const http= require('http');
const socketIo= require('socket.io');
const server= http.createServer(app)
const cors= require('cors');
const bodyParser= require("body-parser");
const gmailService=require('./gmailService');
const WHfacebook=require('./webhooks/messengerFB')
const whatsappService= require('./whatsappService')
const WHwhatsapp= require('./webhooks/whatsapp')
require('dotenv').config();
// const logger=require('./logger')
app.use(cors());

const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods:['GET','POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    },
  });

process.on('uncaughtException', (err) => {
    console.warn('UNCAUGHT EXCEPTION!');
    console.log(err.message);
    process.exit(1);
  });



//middleware to read texts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//////////////////////////////////////////////////////////////////////////////////////
app.post('/sendMessage',async(req,res)=>{
   try {
    const {sendMessage}= req.body
    console.log('received',sendMessage)
    io.emit('newMessage',sendMessage)


    await whatsappService.sendMessage(sendMessage)

    res.sendStatus(200)
   } catch (error) { 
    console.error(error)
   }
}) 
////////socket handler /////////////////////////////////

io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////
server.listen(8000,()=>{
    console.log(`server is running on port 8000...`)
});