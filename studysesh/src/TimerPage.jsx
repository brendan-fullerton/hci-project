import React, { useState, useEffect } from "react";
import "./App.css";
import "./TimerPage.css";

function TimerPage() {
  // Timer state variables
  const [totalTime, setTotalTime] = useState(2 * 60); // Total study time in seconds (25 minutes default)
  const [workTime, setWorkTime] = useState(1 * 60); // Work interval
  const [breakTime, setBreakTime] = useState(1 * 60); // Break interval 
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(workTime); // Time count down
  const [isWorkSession, setIsWorkSession] = useState(true); // Toggle work and break

  // Handle the countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && currentTime > 0) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      // Switch between work and break sessions
      setIsWorkSession(!isWorkSession);
      setCurrentTime(isWorkSession ? breakTime : workTime);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentTime, isWorkSession, workTime, breakTime]);

  // Helper function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Start/Stop button handler
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset button handler
  const handleReset = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setCurrentTime(workTime);
  };

  return (
    <div className="app-container">
      {/* Main content */}
      <div className="main-content">
        <h1>Welcome to StudySesh!</h1>
      
      {/* Timer and presets container */}
      <div className="timer-presets-container">
          {/* Timer section */}
          <div className="timer-section">
            <div className="timer-box">
              <label>Total Study Time</label>
              <div>{formatTime(totalTime)}</div>
            </div>
            <div className="timer-box">
              <label>Work Interval</label>
              <div>{formatTime(workTime)}</div>
            </div>
            <div className="timer-box">
              <label>Break Interval</label>
              <div>{formatTime(breakTime)}</div>
            </div>
          </div>

          {/* Presets section */}
          <div className="presets-section">
            <h2>Presets</h2>
            <ul>
              <li>
                <button>P1: {formatTime(25 * 60)} / {formatTime(5 * 60)}</button>
              </li>
              <li>
                <button>P2: {formatTime(50 * 60)} / {formatTime(10 * 60)}</button>
              </li>
              <li>
                <button>P3: {formatTime(90 * 60)} / {formatTime(15 * 60)}</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Current timer */}
        <div className="current-timer">
          <h2>{isWorkSession ? "Work Time" : "Break Time"}</h2>
          <h1>{formatTime(currentTime)}</h1>
        </div>

        {/* Buttons */}
        <div className="button-section">
          <button className="start-button" onClick={handleStartStop}>
            {isRunning ? "PAUSE" : "START"}
          </button>
          <button className="reset-button" onClick={handleReset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerPage;

