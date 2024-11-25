import React, { useState } from "react";
import "./PetPage.css";

// Example cosmetic items
const cosmetics = [
  { id: 1, name: "Hat", img: "images/cowboyhat.jpg", locked: false },
  { id: 2, name: "Scarf", img: "/images/scarf.jpg", locked: false },
  { id: 3, name: "Glasses", img: "/images/glasses.png", locked: true },
  { id: 4, name: "Bow", img: "/images/bow.png", locked: true },
  { id: 5, name: "Crown", img: "/images/crown.png", locked: true },
];

function PetPage() {
  const [view, setView] = useState("main"); // "main" or "choose-pet"
  const [selectedPet, setSelectedPet] = useState("/images/cat.png");
  const [petName, setPetName] = useState("Whiskers"); // Default pet name
  const [isEditing, setIsEditing] = useState(false);

  // Handle pet name change
  const handleNameChange = (e) => {
    setPetName(e.target.value);
  };

  // Handle pet selection
  const handlePetSelect = (petImg) => {
    setSelectedPet(petImg);
    setView("main");
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <h1>Welcome to StudySesh!</h1>

        {view === "main" ? (
          <div className="pet-section">
            <div className="pet-display">
              <div className="pet-placeholder">
                <img src={selectedPet} alt="Selected Pet" className="pet-image" />
              </div>
              <div className="pet-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={petName}
                    onChange={handleNameChange}
                    onBlur={() => setIsEditing(false)} // Stop editing when the input loses focus
                    className="pet-name-input"
                  />
                ) : (
                  <div className="pet-name-container">
                    <span className="pet-name">{petName}</span>
                    <button
                      className="edit-name-button"
                      onClick={() => setIsEditing(true)}
                    >
                      ✏️
                    </button>
                  </div>
                )}
              </div>
              <button
                className="change-pet-button"
                onClick={() => setView("choose-pet")}
              >
                Change Pet...
              </button>
            </div>

            <div className="cosmetics-section">
              <h2>Cosmetics</h2>
              <div className="cosmetics-grid">
                {cosmetics.map((item) => (
                  <div
                    key={item.id}
                    className={`cosmetic-item ${item.locked ? "locked" : ""}`}
                  >
                    {item.locked ? (
                      <span role="img" aria-label="Locked">
                        🔒
                      </span>
                    ) : (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="cosmetic-image"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="choose-pet-section">
            <h2>Choose Your Pet</h2>
            <div className="pets-grid">
              {/* Render pet options */}
              {["/images/cat.png", "/images/dog.jpg"].map((petImg, index) => (
                <div
                  key={index}
                  className="pet-item"
                  onClick={() => handlePetSelect(petImg)}
                >
                  <img src={petImg} alt={`Pet ${index + 1}`} className="pet-image" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PetPage;