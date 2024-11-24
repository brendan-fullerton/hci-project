import React from "react";
import "./App.css";

function PetPage() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="sidebar-button">Timer</button>
        <button className="sidebar-button selected">Pet</button>
        <button className="sidebar-button">Settings</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1>Welcome to StudySesh!</h1>

        <div className="pet-section">
          <div className="pet-display">
            <div className="pet-placeholder">
              {/* Replace with an actual image for the pet */}
              <div className="pet-face">🐱</div>
            </div>
            <button className="change-pet-button">Change Pet...</button>
          </div>

          <div className="cosmetics-section">
            <h2>Cosmetics</h2>
            <div className="cosmetics-grid">
              {/* Example grid of cosmetic items */}
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className={`cosmetic-item ${index >= 4 ? "locked" : ""}`}
                >
                  {index >= 4 ? "🔒" : "✨"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetPage;
