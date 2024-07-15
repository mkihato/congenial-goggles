import React,{useEffect} from 'react';


const FacebookLogin = () => {
  useEffect(() => {
    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '7767892629969878',
        cookie: true,
        xfbml: true,
        version: 'v20.0'
      });

      window.FB.AppEvents.logPageView();
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#version=v20.0';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information.... ');  
          window.FB.api('/me', function (response) {
            console.log('Good to see you, ' + response.name + '.');
            console.log(response);
          });
          window.location.href = `/auth/callback?access_token=${response.authResponse.accessToken}`
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email,pages_messaging,pages_manage_metadata,pages_read_engagement,pages_show_list,pages_manage_posts,pages_manage_engagement,business_management' }
    );
    window.FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token 
        // and signed request each expire
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;

        console.log(uid);
        console.log(accessToken);
        
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        console.log('You have not authorized,please try logging in again') 
        // but has not authenticated your app
      } else {
        // the user isn't logged in to Facebook.
        console.log('You are not logged in, please go back to the homepage')
      }
     });
    
    
  };

  return (
    <div className="fb-login-button" data-width="20" data-size="" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="false">
      <button onClick={handleFBLogin}>Login with Facebook</button>
    </div>
    
  );
};

export default FacebookLogin;

