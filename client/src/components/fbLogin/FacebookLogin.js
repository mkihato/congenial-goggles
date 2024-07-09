import React from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from "react-social-login-buttons";

const FacebookLogin = ({ onLogin }) => {
  // useEffect(() => {
  //   // Initialize the Facebook SDK
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: 'YOUR_APP_ID',
  //       cookie: true,
  //       xfbml: true,
  //       version: 'v10.0'
  //     });

  //     window.FB.AppEvents.logPageView();
  //   };

  //   // Load the Facebook SDK script
  //   (function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = 'https://connect.facebook.net/en_US/sdk.js';
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, 'script', 'facebook-jssdk');
  // }, []);

  // const handleFBLogin = () => {
  //   window.FB.login(
  //     function (response) {
  //       if (response.authResponse) {
  //         console.log('Welcome! Fetching your information.... ');
  //         window.FB.api('/me', function (response) {
  //           console.log('Good to see you, ' + response.name + '.');
  //           onLogin(response);
  //         });
  //       } else {
  //         console.log('User cancelled login or did not fully authorize.');
  //       }
  //     },
  //     { scope: 'public_profile,email,pages_messaging' }
  //   );
  // };

  return (
      
        <LoginSocialFacebook
        appId="7767892629969878"
        onResolve={(res)=>{
          console.log(res)
        }}
        onReject={(res)=>{
          console.log(res)
        }}
        >
          
          <FacebookLoginButton/>
        </LoginSocialFacebook>
  );
};

export default FacebookLogin;

