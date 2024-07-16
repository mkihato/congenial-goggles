const express= require('express');
const router= express.Router();
const axios  = require('axios');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { google }= require('googleapis');

///utilities

const createConfig= (url, accessToken)=>{
    return{
        method:'get',
        url, url,
        headers:{
            Authorization:`Bearer ${accessToken}`,
            'Content-type':'application/json'
        },
    }
}

///constants
const auth={
    type:'OAuth2',
    user:'marvin@telvoip.io',
    clientId:process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
}

// const mailOptions(emailTo, body)={
//     from: `marvin@telvoip.io`,
//     to: `${}`,
//     subject:`${}`,

// }


 

const oAuth2Client= new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
);

oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

///controllers



async function getMailList(req,res){
    try{
        const url=`https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages`;
        const {token}= await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);


    }
    catch(error){
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          } else {
            console.error('Error message:', error.message);
          }
    }
}
async function readMail(req,res){
    try{
        const url=`https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;
        const {token}= await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        
        let data = await response.data
        res.json(data);
       

    }
    catch(error){
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          } else {
            console.error('Error message:', error.message);
          }
    }
}
async function getUser(req,res){
    try{
        const url=`https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
        const {token}= await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);

    }
    catch(error){
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          } else {
            console.error('Error message:', error.message);
          }
    }
}
async function getDrafts(req,res){
    try{
        const url=`https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const {token}= await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);

    }
    catch(error){
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          } else {
            console.error('Error message:', error.message);
          }
    }
}
async function getMails(req,res){
    try{
        const url=`https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads?maxResults=100`;
        const {token}= await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        
        res.json(response.data);
    }
    catch(error){
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          } else {
            console.error('Error message:', error.message);
          }
    }
}
async function sendMail(req, res){
    try{
        const accessToken = await oAuth2Client.getAccessToken();
        let token = await accessToken.token;

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                ...CONSTANTS.auth,
                accessToken: token,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // const mailOptions = {
        //     ...CONSTANTS.mailOptions,
        //     text: 'This is the third test mail using Gmail API...'
        // };
        const mailOptions={
            from: 'marvin@telvoip.io',
            to: 'marvinkihato@gmail.com',
            subject:'first email using gmail api',
        
        }

        const result = await transport.sendMail(mailOptions);
        res.send(result);
    }
    catch(error){
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          } else {
            console.error('Error message:', error.message);
          }
    }
}

///routes
router.get('/mail/list/:email/messages', getMailList);
router.get('/mail/list/:email/messages/:messageId', readMail);
router.get('/mail/user/:email', getUser);
router.get('/mail/drafts/:email', getDrafts);
router.get('/mail/list/:email', getMails);
router.get('/mail/send', sendMail);




module.exports= router;