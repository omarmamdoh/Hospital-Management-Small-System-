import React, { useState, useEffect } from "react";
import "./DoctorsList.css";

function DoctorsList({ user }) {
  const [doctors, setDoctors] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);

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

  const getAvailableSchedules = async () => {
    try {
      const response = await fetch("http://localhost:555/schedules/available", {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setAvailableSchedules(data);
      } else {
        alert("Failed to get schedules: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const bookAppointment = async (scheduleId) => {
    if (!user) {
      alert("Please login to book appointments");
      return;
    }

    try {
      const response = await fetch("http://localhost:555/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ scheduleId: scheduleId }),
      });

      const data = await response.text();
      if (response.ok) {
        alert("Appointment booked successfully!");
        getAvailableSchedules(); // Refresh available schedules
      } else {
        alert("Failed to book appointment: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getAllDoctors();
    getAvailableSchedules();
  }, []);

  return (
    <div className="container">
      <h3>{user?.role === "admin" ? "Manage Doctors" : "View All Doctors"}</h3>

      <div className="section">
        <h4 className="section-title">Available Doctors:</h4>
        <button onClick={getAllDoctors} className="refresh-btn">
          {"Refresh Doctors"}
        </button>
        <div>
          {doctors.length === 0 ? (
            <p>No doctors available.</p>
          ) : (
            <div>
              {doctors.map((doctor, index) => (
                <div key={index} className="doctor-card">
                  <strong>Name:</strong> {doctor.NAME}
                  <br />
                  <strong>Specialization:</strong> {doctor.SPECIALTY}
                  <br />
                  <strong>Email:</strong> {doctor.EMAIL}
                  <br />
                  <strong>Experience:</strong> {doctor.YEARS_OF_EXPERIENCE}{" "}
                  years
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {user?.role === "user" && (
        <div className="section">
          <h4 className="section-title">Available Appointment Slots:</h4>
          <button onClick={getAvailableSchedules} className="refresh-btn">
            {"Refresh Schedules"}
          </button>
          <div>
            {availableSchedules.length === 0 ? (
              <p>No available appointment slots.</p>
            ) : (
              <div>
                {availableSchedules.map((schedule, index) => (
                  <div key={index} className="schedule-card">
                    <strong>Doctor:</strong> {schedule.doctor_name}
                    <br />
                    <strong>Specialty:</strong> {schedule.SPECIALTY}
                    <br />
                    <strong>Date:</strong> {schedule.APPOINTMENT_DATE}
                    <br />
                    <strong>Time:</strong> {schedule.START_TIME} -{" "}
                    {schedule.END_TIME}
                    <br />
                    <div>
                      <button
                        onClick={() => bookAppointment(schedule.ID)}
                        className="book-btn"
                      >
                        Book This Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorsList;
