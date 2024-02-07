import React, { useState, useEffect } from "react";
import {Form, Button} from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://myflix-movienet-6e137990a158.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        return response.json().then((errorData)=>{
          throw new Error(errorData.message)
        })
        // .catch((error)=>{
        //   console.error("Error", error.message)
        //   alert("Signup failed" + error.message);
        // });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Username:
        <Form.Control
          type="text"
          value={username}
          placeholder="Enter Username..."
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        <Form.Control
          type="password"
          value={password}
          placeholder="Enter Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter Email..."
          onChange={(e) => setEmail(e.target.value)}
          
        />
      </label>
      <label>
        Birthday:
        <Form.Control
          type="date"
          value={birthday}
          placeholder="Enter Birthday..."
          onChange={(e) => setBirthday(e.target.value)}
          
        />
      </label>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};
