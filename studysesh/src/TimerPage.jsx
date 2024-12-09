import React, { useState, useEffect } from "react";
import StudySpace from "./StudySpace";
import "./TimerPage.css";

function TimerPage() {
  // Timer state variables
  const [totalTime, setTotalTime] = useState(25 * 60); // Total study time in seconds (default: 25 minutes)
  const [workTime, setWorkTime] = useState(25 * 60); // Work interval
  const [breakTime, setBreakTime] = useState(5 * 60); // Break interval
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(workTime); // Current countdown
  const [isWorkSession, setIsWorkSession] = useState(true); // Toggle work and break
  const [isStudying, setIsStudying] = useState(false); // Toggle study space
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [selectedPet, setSelectedPet] = useState("/images/cat.png"); // Default selected pet

  // Handle the countdown logic
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

  // Helper function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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
                <form>
                  <input
                    type="text"
                    name="total"
                    value={formatTime(totalTime)}
                    onChange={(e) =>
                      setTimes(e.target.value * 60, workTime, breakTime)
                    }
                  />
                </form>
              </div>
              <div className="timer-box">
                <label>Work Interval (mm:ss)</label>
                <form>
                  <input
                    type="text"
                    name="work"
                    value={formatTime(workTime)}
                    onChange={(e) =>
                      setTimes(totalTime, e.target.value * 60, breakTime)
                    }
                  />
                </form>
              </div>
              <div className="timer-box">
                <label>Break Interval (mm:ss)</label>
                <form>
                  <input
                    type="text"
                    name="break"
                    value={formatTime(breakTime)}
                    onChange={(e) =>
                      setTimes(totalTime, workTime, e.target.value * 60)
                    }
                  />
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
        />
      )}
    </div>
  );
}

export default TimerPage;