import { useState } from "react";
import FacebookLogin from "../components/fbLogin/FacebookLogin";

const Home=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // const handleSignUp = async (e) => {
    //   e.preventDefault();
    //   // Call your backend API to register the user
    //   try {
    //     const response = await fetch('/api/signup', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ email, password })
    //     });
    //     const data = await response.json();
    //     console.log('User signed up:', data);
    //   } catch (error) {
    //     console.error('Error signing up:', error);
    //   }
    // };
  
    // const handleFacebookLogin = (authResponse) => {
    //   // Handle Facebook login response
    //   console.log('Facebook auth response:', authResponse);
    //   // You can call your backend API to register or log in the user with Facebook data
    // };
  
    return(
    <div className="sign-up">
      <h2>Sign Up</h2>
      <form >
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <hr />
      <FacebookLogin  />
    </div>
  
    )
    


}

export default Home;
