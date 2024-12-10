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

  const [rawTotalTime, setRawTotalTime] = useState(formatTime(totalTime));
  const [rawWorkTime, setRawWorkTime] = useState(formatTime(workTime));
  const [rawBreakTime, setRawBreakTime] = useState(formatTime(breakTime));

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
                  e.preventDefault();
                  setTotalTime(unformatTime(rawTotalTime));
                }}
              >
                <input
                  type="text"
                  name="total"
                  value={rawTotalTime} // Local state for raw input
                  onChange={(e) => setRawTotalTime(e.target.value)} // Update raw input state
                />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="timer-box">
              <label>Work Interval (mm:ss)</label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setWorkTime(unformatTime(rawWorkTime));
                  setCurrentTime(unformatTime(rawWorkTime));
                }}
              >
                <input
                  type="text"
                  name="work"
                  value={rawWorkTime}
                  onChange={(e) => setRawWorkTime(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="timer-box">
              <label>Break Interval (mm:ss)</label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBreakTime(unformatTime(rawBreakTime));
                }}
              >
                <input
                  type="text"
                  name="break"
                  value={rawBreakTime}
                  onChange={(e) => setRawBreakTime(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
            </div>

            {/* Presets section */}
            <div className="presets-section">
              <h2>Presets</h2>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      const newTotal = 25 * 60;
                      const newWork = 25 * 60;
                      const newBreak = 5 * 60;

                      setTotalTime(newTotal);
                      setWorkTime(newWork);
                      setBreakTime(newBreak);
                      setCurrentTime(newWork);

                      setRawTotalTime(formatTime(newTotal));
                      setRawWorkTime(formatTime(newWork));
                      setRawBreakTime(formatTime(newBreak));
                    }}
                  >
                    P1: 25 min / 5 min
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const newTotal = 50 * 60;
                      const newWork = 50 * 60;
                      const newBreak = 10 * 60;

                      setTotalTime(newTotal);
                      setWorkTime(newWork);
                      setBreakTime(newBreak);
                      setCurrentTime(newWork);

                      setRawTotalTime(formatTime(newTotal));
                      setRawWorkTime(formatTime(newWork));
                      setRawBreakTime(formatTime(newBreak));
                    }}
                  >
                    P2: 50 min / 10 min
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const newTotal = 90 * 60;
                      const newWork = 90 * 60;
                      const newBreak = 15 * 60;

                      setTotalTime(newTotal);
                      setWorkTime(newWork);
                      setBreakTime(newBreak);
                      setCurrentTime(newWork);

                      setRawTotalTime(formatTime(newTotal));
                      setRawWorkTime(formatTime(newWork));
                      setRawBreakTime(formatTime(newBreak));
                    }}
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