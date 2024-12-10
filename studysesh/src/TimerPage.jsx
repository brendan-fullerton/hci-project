import React, { useState } from "react";
import StudySpace from "./StudySpace";
import "./TimerPage.css";

function TimerPage({ 
  isStudying, setIsStudying,
  totalTime, setTotalTime,
  workTime, setWorkTime, 
  breakTime, setBreakTime, 
  isRunning, setIsRunning, 
  currentTime, setCurrentTime, 
  isWorkSession, setIsWorkSession, 
  isPaused, setIsPaused,
  selectedPet, setSelectedPet,
  selectedCosmetic, setSelectedCosmetic }) {

  // Helper function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const unformatTime = (str) => {
    const [minutes, seconds] = str.split(":").map(Number);
    if (isNaN(minutes) || isNaN(seconds)) {
      throw new Error("Invalid time format. Expected 'MM:SS'.");
    }
    return minutes * 60 + seconds;
  }

  // Start/Stop button handler
  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setIsStudying(true); // Transition to the study space
    }
  };

  // Reset button handler
  const handleReset = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setCurrentTime(workTime);
    setIsStudying(false); // Exit the study space
    setIsPaused(false); // Ensure timer is unpaused
  };

  // Pause/Unpause button handler
  const handlePauseToggle = () => {
    setIsPaused(!isPaused); // Toggle pause state
  };

  // Helper function to set total, work, and break times
  const setTimes = (t, w, b) => {
    setTotalTime(t);
    setWorkTime(w);
    setBreakTime(b);
    setCurrentTime(w);
  };

  return (
    <div className="app-container">
      {!isStudying ? (
        <div className="main-content">
          <h1>Welcome to StudySesh!</h1>

          {/* Timer and presets container */}
          <div className="timer-presets-container">
            {/* Timer section */}
            <div className="timer-section">
              <div className="timer-box">
                <label>Total Study Time (mm:ss)</label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent the default form submission behavior (page reload)
                    setTotalTime(unformatTime(e.target.total.value)); // Access the input value by its name
                  }}
                >
                  <input
                    type="text"
                    name="total"
                    defaultValue={formatTime(totalTime)} // Use defaultValue for uncontrolled input
                  />
                  <button type="submit">Submit</button> {/* Optional button for clarity */}
                </form>
              </div>
              <div className="timer-box">
                <label>Work Interval (mm:ss)</label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent the default form submission behavior
                    setWorkTime(unformatTime(e.target.work.value));
                    setCurrentTime(unformatTime(e.target.work.value));
                  }}
                >
                  <input
                    type="text"
                    name="work"
                    defaultValue={formatTime(workTime)} // Use defaultValue for uncontrolled input
                  />
                  <button type="submit">Submit</button> {/* Optional button for explicit submission */}
                </form>
              </div>
              <div className="timer-box">
                <label>Break Interval (mm:ss)</label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent the default form submission
                    setBreakTime(unformatTime(e.target.break.value)); // Update breakTime with the entered value
                  }}
                >
                  <input
                    type="text"
                    name="break"
                    defaultValue={formatTime(breakTime)} // Use defaultValue for uncontrolled input
                  />
                  <button type="submit">Submit</button> {/* Optional submit button */}
                </form>
              </div>
            </div>

            {/* Presets section */}
            <div className="presets-section">
              <h2>Presets</h2>
              <ul>
                <li>
                  <button
                    onClick={() => setTimes(25 * 60, 25 * 60, 5 * 60)}
                  >
                    P1: 25 min / 5 min
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setTimes(50 * 60, 50 * 60, 10 * 60)}
                  >
                    P2: 50 min / 10 min
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setTimes(90 * 60, 90 * 60, 15 * 60)}
                  >
                    P3: 90 min / 15 min
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Current timer */}
          <div className="current-timer">
            <h2>
              {isWorkSession ? "Work Time (mm:ss)" : "Break Time (mm:ss)"}
            </h2>
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
      ) : (
        <StudySpace
          isWorkSession={isWorkSession}
          currentTime={currentTime}
          onReset={handleReset}
          onPauseToggle={handlePauseToggle}
          isPaused={isPaused}
          selectedPet={selectedPet} // Pass selected pet
          selectedCosmetic={selectedCosmetic} // cosmetic
        />
      )}
    </div>
  );
}

export default TimerPage;