import React from "react";
import "./App.css";
import Sidebar from './Sidebar';

function SettingsPage() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      {/* <div className="sidebar">
        <button className="sidebar-button">Timer</button>
        <button className="sidebar-button">Pet</button>
        <button className="sidebar-button">Settings</button>
      </div> */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content">
        <h1>Welcome to StudySesh!</h1>

        {/* Presets section */}
        <div className="presets-section">
          <h2>Presets</h2>
          <ul>
            <li>P1: HH:MM:SS / HH:MM:SS</li>
            <li>P2: HH:MM:SS / HH:MM:SS</li>
            <li>P3: HH:MM:SS / HH:MM:SS</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="button-section">
          <button className="start-button">START</button>
          <button className="custom-timer-button">Custom Timer...</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
