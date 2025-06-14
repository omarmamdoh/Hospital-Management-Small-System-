import React, { useState, useEffect } from "react";
import "./AdminAppointments.css";

function AdminAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);

  const getAllAppointments = async () => {
    if (!user) return;

    try {
      const response = await fetch("http://localhost:555/admin/bookings", {
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

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:555/booking/status/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.text();
      if (response.ok) {
        alert("Appointment status updated successfully!");
        getAllAppointments(); // Refresh the list
      } else {
        alert("Failed to update status: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getAllAppointments();
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
      <h3>Manage All Appointments</h3>
      <button onClick={getAllAppointments} className="refresh-btn">
        {"Refresh Appointments"}
      </button>
      <div>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div>
            <h4>All Appointments:</h4>
            {appointments.map((appointment, index) => (
              <div key={index} className="appointment-card">
                <strong>Patient:</strong> {appointment.patient_name}
                <br />
                <strong>Doctor:</strong> {appointment.doctor_name}
                <br />
                <strong>Specialty:</strong> {appointment.SPECIALTY}
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
                <br />
                <div style={{ marginTop: "10px" }}>
                  <strong>Change Status:</strong>
                  <select
                    onChange={(e) =>
                      updateAppointmentStatus(appointment.ID, e.target.value)
                    }
                    defaultValue={appointment.STATUS}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAppointments;
