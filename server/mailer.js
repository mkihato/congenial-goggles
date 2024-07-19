// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the mail transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS  // Your Gmail app password or regular password
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.GMAIL_USER, // Sender address
        to: to,                      // List of receivers
        subject: subject,            // Subject line
        text: text                   // Plain text body
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
