import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ navigate, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:555/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        alert("Login successful! Welcome " + data.name);

        // Navigate based on user role
        if (data.role === "admin") {
          navigate("doctors");
        } else if (data.role === "doctor") {
          navigate("appointments");
        } else {
          navigate("doctors");
        }
      } else {
        alert("Login failed: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h3 className="title">User Login</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
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
            className="input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
