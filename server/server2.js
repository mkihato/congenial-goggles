const express= require('express');
const app= express();
const http= require('http');
const bodyParser= require("body-parser");



const cors= require('cors');

require('dotenv').config();
// const logger=require('./logger')
app.use(cors());




//  middleware to read texts      ///////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


////////socket handler /////////////////////////////////



//////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////


app.post('/use', async function (request, response, next) {
    let body=request.body;
    if(body.object === 'page'){


    }
    response.status(200).send('EVENT_RECEIVED');
});
////////////////////////////////////////////////////////////////////

//const server= http.createServer(app);


// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//     methods:['GET','POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   },
// });

// process.on('uncaughtException', (err) => {
//   console.warn('UNCAUGHT EXCEPTION!');
//   console.log(err.message);
//   process.exit(1);
// });

// io.on('connection', (socket) => {
//   console.log('New client-server connected');

//   socket.on('sent_message', (message) => {
//     console.log('Message sent by client:', message);
//     // Do not broadcast this message back to the client
//   });

//   socket.on('disconnect', () => {
//     console.log('Client-server disconnected');
//   });
// });



// app.set('socketio', io);
////////////////////////////////////////////////////////////////////////////////////

http.createServer(app).listen(7000,()=>{
    console.log("server is running on port 8000...")
});