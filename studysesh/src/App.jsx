import React, { useState } from "react";
import LoginPage from "./LoginPage";
import PetPage from "./PetPage";
import Sidebar from "./Sidebar";
import TimerPage from "./TimerPage";

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
      //case "settings":
        //return <SettingsPage />;
      default:
        return <TimerPage />;
    }
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        // Render the Login Page
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        // Render the Sidebar and Main Content for Logged-In Users
        <>
          <div className="main-layout">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="main-content">{renderPage()}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
