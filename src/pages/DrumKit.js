import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/drumkit.css";

const DrumKit = () => {
  const navigate = useNavigate();

  return (
    <div className="drumkit-container">
      <h1>🥁 Welcome to the Drum Kit Page! 🥁</h1>
      <p>Click on the drums to explore different features.</p>

      <button
        className="back-button"
        onClick={() => {
          sessionStorage.setItem("comingBack", "true"); // ✅ Keep Home state
          navigate("/");
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default DrumKit;
