import React from "react";
import "./Sidebar.css";

function Sidebar({ currPage, setCurrPage }) {
  return (
    <div className="sidebar">
      <button
        onClick={() => setCurrPage("timer")}
        className={`sidebar-button ${currPage === "timer" ? "active" : ""}`}
      >
        Timer
      </button>
      <button
        onClick={() => setCurrPage("pet")}
        className={`sidebar-button ${currPage === "pet" ? "active" : ""}`}
      >
        Pet
      </button>
      <button
        onClick={() => setCurrPage("settings")}
        className={`sidebar-button ${currPage === "settings" ? "active" : ""}`}
      >
        Settings
      </button>
    </div>
  );
}

export default Sidebar;
