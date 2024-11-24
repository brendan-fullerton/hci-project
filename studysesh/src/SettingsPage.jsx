import React from "react";
import "./App.css";

function SettingsPage() {
  return (
    <div className="app-container">

      {/* Main content */}
      <div className="main-content">
        <h1>Welcome to StudySesh!</h1>

        {/* Buttons */}
        <div className="button-section">
          <button className="theme-button">Change Theme</button>
          <button className="logout-button">Log out</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
