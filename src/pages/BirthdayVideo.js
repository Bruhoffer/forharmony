import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/birthdayvideo.css";

const BirthdayVideo = () => {
  const navigate = useNavigate();

  return (
    <div className="video-container">
      <h1>🎥 Happy Birthday, Harmony! 🎥</h1>
      <p>Here’s a special video just for you!</p>

      <video width="600" controls>
        <source src="your-video-url.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

export default BirthdayVideo;
