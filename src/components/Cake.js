import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cake.css";
import CakeSVG from "../components/cakesvg";
import confettiImage from "../components/confetti.gif";
import { motion } from "framer-motion";

function Cake({ onBlowoutComplete }) {
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCake, setShowCake] = useState(true);
  const navigate = useNavigate();

  // 🛠 Microphone Detection for Blowout
  const initBlowDetection = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 512;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      source.connect(analyser);

      let blowStartTime = null;

      function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        const lowFrequencyValues = dataArray.slice(0, 15);
        const averageLowFrequency = lowFrequencyValues.reduce((sum, value) => sum + value, 0) / lowFrequencyValues.length;

        const blowThreshold = 50;
        const requiredDuration = 1000;

        if (averageLowFrequency > blowThreshold) {
          if (!blowStartTime) {
            blowStartTime = performance.now();
          } else if (performance.now() - blowStartTime > requiredDuration) {
            setCandlesBlownOut(true);
            setShowConfetti(true);
            setShowCake(false); // Hide Cake After Blowout

            // 🎉 Show confetti for 4 seconds before navigating
            setTimeout(() => {
              setShowConfetti(false);
              onBlowoutComplete(); // Notify Home.js
              navigate("/"); // Redirect to Home
            }, 4000);
          }
        } else {
          if (blowStartTime && performance.now() - blowStartTime > 200) {
            blowStartTime = null;
          }
        }

        requestAnimationFrame(detectBlow);
      }

      detectBlow();
    } catch (error) {
      console.error("Microphone access denied:", error);
    }
  }, [navigate, onBlowoutComplete]);

  // 🎤 Start microphone detection on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      initBlowDetection();
    }, 10000);

    return () => clearTimeout(timer);
  }, [initBlowDetection]);

  return (
    <>
      <div className="bg-black/80 h-screen w-screen flex items-center justify-center overflow-hidden relative">
        {/* 🎉 Confetti Overlay (Shows Briefly) */}
        {showConfetti && (
          <motion.div
            className="confetti-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${confettiImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              zIndex: 50,
            }}
          />
        )}

        {/* 🎂 Cake (Only Shows If Not Blown Out) */}
        {showCake && (
          <div className="relative z-10">
            <div className="absolute -top-48 left-1/2 transform -translate-x-1/2">
              {!candlesBlownOut && (
                <div className="candle">
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                </div>
              )}
            </div>
            <CakeSVG />
          </div>
        )}
      </div>
    </>
  );
}

export default Cake;
