import React from "react";
import "./Home.css";
import homeImage from "../home.jpg";

function Home() {
  return (
    <div className="home-container">
      <h2 className="welcome-title">Welcome to Hospital Management System</h2>
      <p className="welcome-text">
        Manage your healthcare appointments and doctor schedules.
      </p>
      <div className="home-image-container">
        <img src={homeImage} alt="Hospital Welcome" className="home-image" />
      </div>
    </div>
  );
}

export default Home;
