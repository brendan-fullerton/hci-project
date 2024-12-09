import React, { useState } from "react";
import "./PetPage.css";

// Example cosmetic items
const cosmetics = [
  { id: 1, name: "Star", img: "images/star.png", locked: false },
  { id: 2, name: "Scarf", img: "/images/scarf.png", locked: false },
  { id: 3, name: "Glasses", img: "/images/glasses.png", locked: true },
  { id: 4, name: "Bow", img: "/images/bow.png", locked: true },
  { id: 5, name: "Crown", img: "/images/crown.png", locked: true },
];

function PetPage({
  selectedPet, setSelectedPet,
  selectedCosmetic, setSelectedCosmetic
}) {
  const [view, setView] = useState("main"); // "main" or "choose-pet"
  // const [selectedPet, setSelectedPet] = useState("/images/cat.png");
  const [petNames, setPetNames] = useState({
    "/images/cat.png": "Whiskers",
    "/images/dog.jpg": "Buddy",
  }); // Map to store pet names
  const [isEditing, setIsEditing] = useState(false);
  // const [selectedCosmetic, setSelectedCosmetic] = useState(null); // State for selected cosmetic

  // Handle pet name change
  const handleNameChange = (e) => {
    setPetNames({
      ...petNames,
      [selectedPet]: e.target.value,
    });
  };

  // Handle pet selection
  const handlePetSelect = (petImg) => {
    setSelectedPet(petImg);
    setView("main");
  };

  // Handle cosmetic selection
  const handleCosmeticSelect = (cosmeticImg) => {
    setSelectedCosmetic(cosmeticImg);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <h1>Welcome to StudySesh!</h1>

        {view === "main" ? (
          <div className="pet-section">
            <div className="pet-display">
              <div className="pet-placeholder">
                {/* Pet image container */}
                <div className="pet-container">
                <img src={selectedPet} alt="Selected Pet" className="pet-image" />
                  {selectedCosmetic && (
                    <img
                      src={selectedCosmetic}
                      alt="Selected Cosmetic"
                      className="cosmetic-overlay"
                    />
                  )}
                </div>
              </div>
              <div className="pet-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={petNames[selectedPet] || ""}
                    onChange={handleNameChange}
                    onBlur={() => setIsEditing(false)}
                    className="pet-name-input"
                  />
                ) : (
                  <div className="pet-name-container">
                    <span className="pet-name">{petNames[selectedPet]}</span>
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
                    onClick={() =>
                      !item.locked && handleCosmeticSelect(item.img)
                    }
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