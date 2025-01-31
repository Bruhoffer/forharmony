import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dragpapers.css";

const DragPapers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let highestZ = 1;
    document.querySelectorAll(".paper").forEach((paper) => {
        let holdingPaper = false;
        let offsetX = 0, offsetY = 0;
        let rotation = Math.random() * 30 - 15;
      
        paper.style.position = "absolute"; // ✅ Ensure absolute positioning
        paper.style.transform = `rotateZ(${rotation}deg)`;
      
    paper.addEventListener("mousedown", (e) => {
        holdingPaper = true;
        paper.style.zIndex = highestZ++;
    
        // ✅ Use `offsetLeft` and `offsetTop` instead of `getBoundingClientRect()`
        offsetX = e.clientX - paper.offsetLeft;
        offsetY = e.clientY - paper.offsetTop;
        
        e.preventDefault(); // Prevents unwanted text selection while dragging
    });
    
    document.addEventListener("mousemove", (e) => {
        if (holdingPaper) {
        // ✅ Use `absolute` positioning correctly
        paper.style.left = `${e.clientX - offsetX}px`;
        paper.style.top = `${e.clientY - offsetY}px`;
        }
    });
    
    document.addEventListener("mouseup", () => {
        holdingPaper = false;
    });
    });
    
  }, []);

  return (
    <div className="drag-container">
      <h1 className="title">drag the paper!</h1>

      <div className="paper-container">
        <div className="paper heart"></div>

        <div className="paper image">
          <p> thank you for being you</p>
          <p> </p>
          <img src="/images/7.JPG" alt="Memory 1" />
        </div>

        <div className="paper image">
          <p> thank you for saving me</p>
          <p> from the world</p>
          <img src="/images/4.JPG" alt="Memory 1" />
        </div>

        <div className="paper image">
          <p> and the most beautiful memories</p>
          <p> </p>
          <img src="/images/1.JPG" alt="Memory 1" />
        </div>

        <div className="paper image">
          <p> but when you came along, you</p>
          <p> filled it with love,</p>
          <img src="/images/2.JPG" alt="Memory 2" />
        </div>

        <div className="paper red">
          <p className="p1">life before you was like this</p>
          <p className="p2">piece of blank paper</p>
        </div>

        <div className="paper">
          <p className="p1">to tell you how incredibly lucky</p>
          <p className="p1">i am to have met you.<span style={{ color: "red" }}>❤️</span></p>
        </div>

        <div className="paper">
          <p className="p1">I just wanted to take a moment...</p>
        </div>
      </div>

      {/* ✅ Back Button to Home */}
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

export default DragPapers;
