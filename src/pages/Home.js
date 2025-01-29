import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Cake from "../components/Cake";

const Home = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "You’re the most amazing person, and this website is just for you. ❤️";

  useEffect(() => {
    if (showOptions) {
      setTimeout(() => setShowText(true), 1000); // Delay before text appears
      setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          setTypedText(fullText.slice(0, i));
          i++;
          if (i > fullText.length) {
            clearInterval(interval);
            setShowCursor(false); // Hide cursor after typing
          }
        }, 50);
      }, 2500); // Typing effect delay
    }
  }, [showOptions]);
  
  

  return (
    <div className="home-container">
      {!showOptions ? (
        <Cake onBlowoutComplete={() => setShowOptions(true)} />
      ) : (
        <>
          {/* Title Appears After Cake Blowout */}
          <h1 className="title animate-fade-in">🎉 Happy Birthday, Harmony! 🎉</h1>
          
          {/* Typing Effect for Subtitle */}
          {showText && (
            <p className={`subtitle animate-typing ${typedText === fullText ? "complete" : ""}`}>
                <span dangerouslySetInnerHTML={{ __html: typedText }}></span>
                {showCursor && <span className="cursor">|</span>}
            </p>
            )}

          {/* Buttons Appear After Typing Effect Completes */}
          {typedText === fullText && (
            <div className="button-container">
              <button className="nav-button animate-slide-up" onClick={() => navigate("/drumkit")}>
                🥁 Explore Drum Kit →
              </button>
              <button className="nav-button animate-slide-up" onClick={() => navigate("/birthday-video")}>
                🎥 Watch Birthday Video →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
