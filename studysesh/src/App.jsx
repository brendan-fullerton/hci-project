import React, { useState } from "react";
import LoginPage from "./LoginPage";
import PetPage from "./PetPage";
import Sidebar from "./Sidebar";
import TimerPage from "./TimerPage";
import SettingsPage from "./SettingsPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("timer");

  // Function to dynamically render the current page
  const renderPage = () => {
    switch (currentPage) {
      case "timer":
        return <TimerPage />;
      case "pet":
        return <PetPage />;
      case "settings":
        return <SettingsPage onLogin={() => setIsLoggedIn(false)}/>;
      default:
        return <TimerPage />;
    }
  };
  console.log("Log in status:", {isLoggedIn});

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        // Render the Login Page
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        // Render the Sidebar and Main Content for Logged-In Users
        <>
          <div className="main-layout">
            <Sidebar currPage={currentPage} setCurrPage={setCurrentPage} />
            <div className="main-content">{renderPage()}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
