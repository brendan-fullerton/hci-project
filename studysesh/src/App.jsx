import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import PetPage from "./PetPage";
import Sidebar from "./Sidebar";
import TimerPage from "./TimerPage";
import SettingsPage from "./SettingsPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("timer");
  const [isStudying, setIsStudying] = useState(false); // Toggle study space

  // Timer states
  const [totalTime, setTotalTime] = useState(25 * 60); // Total study time in seconds (default: 25 minutes)
  const [workTime, setWorkTime] = useState(25 * 60); // Work interval
  const [breakTime, setBreakTime] = useState(5 * 60); // Break interval
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(workTime); // Current countdown
  const [isWorkSession, setIsWorkSession] = useState(true); // Toggle work and break
  const [isPaused, setIsPaused] = useState(false); // Pause state

  // Pet states
  const [selectedPet, setSelectedPet] = useState("/images/cat.png");
  const [selectedCosmetic, setSelectedCosmetic] = useState(null); // State for selected cosmetic

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && currentTime > 0) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      // Switch between work and break sessions
      setIsWorkSession(!isWorkSession);
      setCurrentTime(isWorkSession ? breakTime : workTime);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, currentTime, isWorkSession, workTime, breakTime]);

  // Function to dynamically render the current page
  const renderPage = () => {
    switch (currentPage) {
      case "timer":
        return <TimerPage 
          isStudying={isStudying} setIsStudying={setIsStudying}
          totalTime={totalTime} setTotalTime={setTotalTime}
          workTime={workTime} setWorkTime={setWorkTime}
          breakTime={breakTime} setBreakTime={setBreakTime}
          isRunning={isRunning} setIsRunning={setIsRunning}
          currentTime={currentTime} setCurrentTime={setCurrentTime}
          isWorkSession={isWorkSession} setIsWorkSession={setIsWorkSession}
          isPaused={isPaused} setIsPaused={setIsPaused}
          selectedPet={selectedPet}
          selectedCosmetic={selectedCosmetic}
        />;
      case "pet":
        return <PetPage 
          selectedPet={selectedPet} setSelectedPet={setSelectedPet}
          selectedCosmetic={selectedCosmetic} setSelectedCosmetic={setSelectedCosmetic}
        />;
      case "settings":
        return <SettingsPage onLogin={() => setIsLoggedIn(false)} />;
      default:
        return <TimerPage />;
    }
  };

  // Defaults the first page after logging in to the timer page if one should log out
  // I.e. Log in --> Timer --> Settings --> Log Out --> Log in --> Timer
  const defaultToTimer = (loggedIn) => {
    if (loggedIn && currentPage === "settings") {
      setCurrentPage("timer");
    }
    setIsLoggedIn(loggedIn);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        // Render the Login Page
        <LoginPage onLogin={() => defaultToTimer(true)} />
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