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
        <source src="https://drive.google.com/file/d/17pXyxvM8p9Mrf3ud9TQS4R2SkywsblOc/view?usp=sharing" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br />
      <br />

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
