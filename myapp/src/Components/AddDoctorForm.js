import React, { useState } from "react";
import "./AddDoctorForm.css";

function AddDoctorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [password, setPassword] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:555/doctor/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          specialty,
          password,
          yearsOfExperience: parseInt(yearsOfExperience),
        }),
      });

      const data = await response.text();
      if (response.ok) {
        alert("Doctor added successfully!");
        setName("");
        setEmail("");
        setSpecialty("");
        setPassword("");
        setYearsOfExperience("");
      } else {
        alert("Failed to add doctor: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h3>Add Doctor (Admin)</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Doctor Name:</label>
          <input
            type="text"
            placeholder="Enter doctor name"
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
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Specialization:</label>
          <input
            type="text"
            placeholder="Enter specialization"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Years of Experience:</label>
          <input
            type="number"
            placeholder="Enter years of experience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            required
            min="0"
            max="50"
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctorForm;
