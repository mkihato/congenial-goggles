const passport = require("passport");
const FacebookStrategy= require('passport-facebook').Strategy;
const express=require('express')
// const router= express.Router();
const app= express();
const session = require('express-session');
require('dotenv').config();

app.use(session({
    secret:'login2024',
    resave:true,
    saveUninitialized:true
}));
passport.serializeUser((user,callback)=>{
    callback(null, user)
});
passport.deserializeUser((user,callback)=>{
    callback(null, user)
});


app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3007",
    // profileFields:['emails','displayName','name','picture']
  },
  function(accessToken, refreshToken, profile, callback) {
   return callback(null, profile)
  }
));






 


//routes
app.get('/auth/facebook',passport.authenticate('facebook'));



app.get('/auth/facebook/callback',passport.authenticate('facebook',{ failureRedirect: '/login' }),(req,res)=>{
    res.redirect('/')
})


app.get('/',(req,res)=>{
    res.send(`${req.user.displayName}`)
})
// app.get('/login',(req,res)=>{
//    res.send('welcome to the login page,try logging in')
// })
 app.listen(3007,()=>{
     console.log('listening on 3007....')
})
