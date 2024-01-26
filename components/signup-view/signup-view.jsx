import React, { useState, useEffect } from "react";

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

    fetch("SIGNUP_URL", {
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
        alert("Signup failed");
      }
    });

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
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
          <input
            type="password"
            value={password}
            placeholder="Enter Password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            placeholder="Enter Email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            value={birthday}
            placeholder="Enter Birthday..."
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    );
  };
};
