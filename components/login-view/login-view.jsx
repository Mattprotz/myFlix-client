import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import React, { useState } from "react";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    fetch("https://myflix-movienet-6e137990a158.herokuapp.com/login", {
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
    <Form onSubmit={handleLogin}>
      <Form.Group controlID="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          placeholder="(min length 3 characters)"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="(min length 3 characters)"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Login</Button>
      <Link to={`/signup`}>
          <Button variant="link">Signup</Button>
        </Link>
    </Form>
  );
};
