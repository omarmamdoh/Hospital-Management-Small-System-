import React, { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:555/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.text();
      if (response.ok) {
        alert("Registration successful! Please login to continue.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert("Registration failed: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h3 className="title">User Registration</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Full Name:</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className="input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
