import React, { useState, useEffect } from "react";
import "./AddDoctorSchedule.css";

function AddDoctorSchedule({ user }) {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    doctorAccountId: "",
    appointmentDate: "",
    startTime: "",
    endTime: "",
  });

  const getAllDoctors = async () => {
    try {
      const response = await fetch("http://localhost:555/doctors", {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setDoctors(data);
      } else {
        alert("Failed to get doctors: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.doctorAccountId ||
      !formData.appointmentDate ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:555/doctor/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      if (response.ok) {
        alert("Schedule added successfully!");
        setFormData({
          doctorAccountId: "",
          appointmentDate: "",
          startTime: "",
          endTime: "",
        });
      } else {
        alert("Failed to add schedule: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <div className="container">
      <h3>Add Doctor Schedule</h3>
      <button onClick={getAllDoctors} className="refresh-btn">
        {"Refresh Doctors"}
      </button>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">
            <strong>Select Doctor:</strong>
          </label>
          <select
            name="doctorAccountId"
            value={formData.doctorAccountId}
            onChange={handleInputChange}
            className="select"
            required
          >
            <option value="">Choose a doctor...</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor.ID}>
                {doctor.NAME} - {doctor.SPECIALTY}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label">
            <strong>Appointment Date:</strong>
          </label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">
            <strong>Start Time:</strong>
          </label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">
            <strong>End Time:</strong>
          </label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Schedule
        </button>
      </form>
    </div>
  );
}

export default AddDoctorSchedule;
