import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      access: username,
      secret: password,
    };
    fetch("https://myflix-movienet-6e137990a158.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) //transforms response content into json prepped for JWT extraction
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user)); // storing user and token locally
            localStorage.setItem("token", data.token); // ^ persisting a login session
          onLoggedIn(data.user, data.token); //pass back to main-view
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
