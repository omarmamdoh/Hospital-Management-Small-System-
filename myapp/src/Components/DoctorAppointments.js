import React, { useState, useEffect } from "react";
import "./DoctorAppointments.css";

function DoctorAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);

  const getDoctorAppointments = async () => {
    if (!user) return;

    try {
      const response = await fetch("http://localhost:555/doctor/bookings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setAppointments(data);
      } else {
        alert("Failed to get appointments: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getDoctorAppointments();
  }, [user]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-confirmed";
      case "Pending":
        return "status-pending";
      case "Completed":
        return "status-completed";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  return (
    <div className="container">
      <h3>My Appointments</h3>
      <button onClick={getDoctorAppointments} className="refresh-btn">
        {"Refresh Appointments"}
      </button>
      <div>
        {appointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <div>
            <h4>Your Appointments:</h4>
            {appointments.map((appointment, index) => (
              <div key={index} className="appointment-card">
                <strong>Patient:</strong> {appointment.patient_name}
                <br />
                <strong>Date:</strong> {appointment.APPOINTMENT_DATE}
                <br />
                <strong>Time:</strong> {appointment.START_TIME} -{" "}
                {appointment.END_TIME}
                <br />
                <strong>Status:</strong>
                <span
                  className={`status-badge ${getStatusClass(
                    appointment.STATUS
                  )}`}
                >
                  {appointment.STATUS}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointments;
