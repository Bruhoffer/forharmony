import React from "react";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>🥁 Welcome to Page 1 (Snare) 🥁</h1>
      <p>This is where you unlock a new feature!</p>
      <button className="back-button" onClick={() => navigate("/drumkit")}>← Back to Drum Kit</button>
    </div>
  );
};

export default Page1;
