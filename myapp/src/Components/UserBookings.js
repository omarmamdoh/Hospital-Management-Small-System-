import React, { useState, useEffect } from "react";
import "./UserBookings.css";

function UserBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  const getUserBookings = async () => {
    if (!user) return;

    try {
      const response = await fetch("http://localhost:555/user/bookings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      } else {
        alert("Failed to get bookings: " + data);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getUserBookings();
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
      <h3>My Bookings</h3>
      <button onClick={getUserBookings} className="refresh-btn">
        {"Refresh Bookings"}
      </button>
      <div>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div>
            <h4>Your Bookings:</h4>
            {bookings.map((booking, index) => (
              <div key={index} className="booking-card">
                <strong>Doctor:</strong> {booking.doctor_name}
                <br />
                <strong>Specialty:</strong> {booking.SPECIALTY}
                <br />
                <strong>Date:</strong> {booking.APPOINTMENT_DATE}
                <br />
                <strong>Time:</strong> {booking.START_TIME} - {booking.END_TIME}
                <br />
                <strong>Status:</strong>
                <span
                  className={`status-badge ${getStatusClass(booking.STATUS)}`}
                >
                  {booking.STATUS}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookings;
