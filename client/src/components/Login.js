import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState("");
  console.log(" : Login -> username", username);
  const [password, setPassword] = useState("");
  console.log(" : Login -> password", password);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserChange = e => {
    setUsername(e.target.value);
  };

  const handlePWChange = e => {
    setPassword(e.target.value);
  };

  const login = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, { username, password })
      .then(res => {
        console.log("response", res);
        const { data } = res;

        sessionStorage.setItem("token", data.payload);
        setIsLoggedIn(true);
      });
  };

  useEffect(() => {
    sessionStorage.getItem("token")
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  }, []);

  return (
    <div className="login-form">
      <h1>{isLoggedIn ? "LOGGED IN!" : "PLEASE LOG IN"}</h1>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUserChange}
          placeholder="Enter username"
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePWChange}
          placeholder="Enter password"
        />
      </form>
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
