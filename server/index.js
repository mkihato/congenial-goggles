const express= require('express');
const app= express();
const http = require('http');
const {Server}= require('socket.io');
const cors= require('cors');
const bodyParser= require("body-parser");
const gmailService=require('./gmailService');
const whatsappService = require('./whatsappService');
// const wappWH=require('./webhooks/wappWH');
require('dotenv').config();

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

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}...`)
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
    res.send('welcome to gmail on express')
})

// app.get('/login/facebook',passport.authenticate('facebook',{scope:['email']}));

// app.get('/facebook', passport.authenticate('facebook',(req,res)=>{
//     res.redirect('/fb')
// }))
            
                
app.get('/',gmailService)
app.use('/api', gmailService)

// app.post("/whatsapp/webhook",wappWH.recieveMessage );
// app.get("/whatsapp/webhook",wappWH.messageStatus );

// app.get('/auth/facebook',passport.authenticate('facebook'));



// app.get('/auth/facebook/callback',passport.authenticate('facebook',{ failureRedirect: '/login' }),(req,res)=>{
//     res.redirect('/')
// })


// app.get('/',(req,res)=>{
//     res.send(`${req.user.displayName}`)
// })