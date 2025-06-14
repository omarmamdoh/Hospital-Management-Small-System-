import React from "react";
import "./NavBar.css";
import logo from "../logo.png";

function NavBar({ navigate, user, setUser }) {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:555/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.log("Logout error:", error);
    }
    setUser(null);
    navigate("home");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("home")}>
        <img src={logo} alt="Hospital Logo" />
        Hospital Management
      </div>
      <div>
        {user ? (
          <div className="user-bar">
            <span className="bold">
              Welcome, {user.name} ({user.role})
            </span>
            {user.role === "user" && (
              <>
                <button
                  onClick={() => navigate("doctors")}
                  className="btn btn-blue"
                >
                  View Doctors & Book
                </button>
                <button
                  onClick={() => navigate("user-bookings")}
                  className="btn btn-green"
                >
                  My Bookings
                </button>
              </>
            )}
            {user.role === "doctor" && (
              <button
                onClick={() => navigate("appointments")}
                className="btn btn-red"
              >
                My Appointments
              </button>
            )}
            {user.role === "admin" && (
              <>
                <button
                  onClick={() => navigate("doctors")}
                  className="btn btn-blue"
                >
                  View Doctors
                </button>
                <button
                  onClick={() => navigate("add-doctor")}
                  className="btn btn-green"
                >
                  Add Doctor
                </button>
                <button
                  onClick={() => navigate("add-schedule")}
                  className="btn btn-orange"
                >
                  Add Schedule
                </button>
                <button
                  onClick={() => navigate("admin-appointments")}
                  className="btn btn-red"
                >
                  Manage Appointments
                </button>
              </>
            )}
            <button onClick={handleLogout} className="btn btn-grey">
              Logout
            </button>
          </div>
        ) : (
          <div className="gap10">
            <button onClick={() => navigate("login")} className="btn btn-blue">
              Login
            </button>
            <button
              onClick={() => navigate("register")}
              className="btn btn-green"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
