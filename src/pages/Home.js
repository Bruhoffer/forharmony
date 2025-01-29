import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Cake from "../components/Cake";

const Home = () => {
  const navigate = useNavigate();

  // ✅ Load `showOptions` from sessionStorage OR default to false
  const [showOptions] = useState(() => {
    return sessionStorage.getItem("showOptions") === "true";
  });

  // ✅ `comingBack` is updated from sessionStorage
  const [comingBack] = useState(
    sessionStorage.getItem("comingBack") === "true"
  );

  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "You’re the most amazing person, and this website is just for you. ❤️";

  // ✅ Automatically reload the page when cake is blown out
  const handleBlowout = () => {
    sessionStorage.setItem("showOptions", "true"); // ✅ Persist cake-blown-out state
    window.location.reload(); // ✅ Auto-reload to enforce state persistence
  };

  // ✅ Update text display when `showOptions` changes
  useEffect(() => {
    if (showOptions) {
      if (comingBack) {
        setTypedText(fullText);
        setShowCursor(false);
      } else {
        let i = 0;
        const interval = setInterval(() => {
          setTypedText(fullText.slice(0, i));
          i++;
          if (i > fullText.length) {
            clearInterval(interval);
            setShowCursor(false);
          }
        }, 50);
      }
    }
  }, [showOptions, comingBack]);

  return (
    <div className="home-container">
      {!showOptions ? (
        <Cake onBlowoutComplete={handleBlowout} />
      ) : (
        <>
          <h1 className="title animate-fade-in">🎉 Happy Birthday, Harmony! 🎉</h1>

          <p className={`subtitle ${comingBack ? "instant-text" : "animate-typing"}`}>
            {typedText}
            {showCursor && <span className="cursor">|</span>}
          </p>

          <div className="button-container">
            <button
              className="nav-button animate-slide-up"
              onClick={() => {
                sessionStorage.setItem("comingBack", "true"); 
                navigate("/drumkit");
              }}
            >
              🥁 Explore Drum Kit →
            </button>
            <button
              className="nav-button animate-slide-up"
              onClick={() => {
                sessionStorage.setItem("comingBack", "true");
                navigate("/birthday-video");
              }}
            >
              🎥 Watch Birthday Video →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
