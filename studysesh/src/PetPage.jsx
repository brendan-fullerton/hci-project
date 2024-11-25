import React from "react";
import "./PetPage.css";

// Example cosmetic items (replace these with your actual image file names)
const cosmetics = [
  { id: 1, name: "Hat", img: "studysesh/src/cowboyhat.jpg", locked: false },
  { id: 2, name: "Scarf", img: "/images/scarf.png", locked: false },
  { id: 3, name: "Glasses", img: "/images/glasses.png", locked: true },
  { id: 4, name: "Bow", img: "/images/bow.png", locked: true },
  { id: 5, name: "Crown", img: "/images/crown.png", locked: true },
];

function PetPage() {
  return (
    <div className="app-container">
      {/* Main content */}
      <div className="main-content">
        <h1>Welcome to StudySesh!</h1>

        <div className="pet-section">
          <div className="pet-display">
            <div className="pet-placeholder">
              {/* Replace with an actual image for the pet */}
              <div className="pet-face">🐱</div>
            </div>
            <button className="change-pet-button">Change Pet...</button>
          </div>

          <div className="cosmetics-section">
            <h2>Cosmetics</h2>
            <div className="cosmetics-grid">
              {/* Render cosmetic items */}
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
      </div>
    </div>
  );
}

export default PetPage;