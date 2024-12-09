import React from "react";
import "./StudySpace.css";

const StudySpace = ({ isWorkSession, currentTime, onReset, onPauseToggle, isPaused, selectedPet }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="study-space-container">
      <h1>Study Time!</h1>
      <div className="pet-display">
        <img src={selectedPet} alt="Your Pet" className="pet-image" />
      </div>
      <h2>{isWorkSession ? "Keep working!" : "Time for a break!"}</h2>
      <h1>{formatTime(currentTime)}</h1>
      <div className="button-section">
        <button className="reset-button" onClick={onReset}>
          RESET
        </button>
        <button className="pause-button" onClick={onPauseToggle}>
          {isPaused ? "UNPAUSE" : "PAUSE"}
        </button>
      </div>
    </div>
  );
};

export default StudySpace;