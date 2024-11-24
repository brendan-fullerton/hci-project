import React from "react";

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <div className="sidebar">
      <button
        onClick={() => setCurrentPage("timer")}
        className={`sidebar-button ${currentPage === "timer" ? "active" : ""}`}
      >
        Timer
      </button>
      <button
        onClick={() => setCurrentPage("pet")}
        className={`sidebar-button ${currentPage === "pet" ? "active" : ""}`}
      >
        Pet
      </button>
      <button
        onClick={() => setCurrentPage("settings")}
        className={`sidebar-button ${currentPage === "settings" ? "active" : ""}`}
      >
        Settings
      </button>
    </div>
  );
}

export default Sidebar;
