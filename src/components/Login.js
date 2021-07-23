import React, {useState} from "react";
import axios from "axios";
import axiosWithAuth from "../helpers/axiosWithAuth";
import {useHistory} from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    login: {
      user: "",
      pass: ""
    }
  })

  const [error, setError] = useState({
    error: ""
  })

  const handleChange = e => {
    setLoginInfo({
      login: {
        ...loginInfo.login,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(loginInfo.login.user !== "Lambda" || loginInfo.login.pass !== "School"){
      setError("Double check your inputs, I think you put them in wrong");
    }
    
    axiosWithAuth()
      .post("/api/login", loginInfo)
      .then((res) => {
        localStorage.setItem("token", res.data.payload)
        history.push("/bubblepage")
      })
      .catch(err => {console.log(err)})
  }
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginInfo.login.user}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={loginInfo.login.pass}
          onChange={handleChange}
        />

        <button>Log in</button>
      </form>
      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"