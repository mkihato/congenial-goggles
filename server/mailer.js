// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();
const { google }= require('googleapis');

// Configure the mail transporter using Gmail's SMTP server

const oAuth2Client= new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
);

oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
const accessToken = oAuth2Client.getAccessToken();
let token =  accessToken.token;
const transporter = nodemailer.createTransport({

    
    service: 'gmail',
    auth: {
        // user: process.env.GMAIL_USER, // Your Gmail address
        // pass: process.env.GMAIL_PASS  // Your Gmail app password or regular password
        type:'OAuth2',
    user:'marvin@telvoip.io',
    clientId:process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: token,
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'marvin@telvoip.io', // Sender address
        to: to,                      // List of receivers
        subject: subject,            // Subject line
        text: text                   // Plain text body
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
