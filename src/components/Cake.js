import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/cake.css";

const Cake = ({ onBlowoutComplete }) => {
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let blowStartTime = null;

    async function initBlowDetection() {
      try {
        // Request mic access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermissionGranted(true); // ✅ Indicate mic access was granted

        // Set up audio analysis
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);

        detectBlow();
      } catch (error) {
        console.error("Microphone access denied:", error);
        setMicPermissionGranted(false); // ❌ Mic access denied
      }
    }

    function detectBlow() {
      if (!analyser || !dataArray) return;
      analyser.getByteFrequencyData(dataArray);
      const lowFrequencyValues = dataArray.slice(0, 15); // Get low frequencies
      const averageLowFrequency = lowFrequencyValues.reduce((sum, value) => sum + value, 0) / lowFrequencyValues.length;

      const blowThreshold = 100; // Adjust for sensitivity
      const requiredDuration = 1000; // Must blow for 1.5 sec

      if (averageLowFrequency > blowThreshold) {
        if (!blowStartTime) {
          blowStartTime = performance.now();
        } else if (performance.now() - blowStartTime > requiredDuration) {
          setCandlesBlownOut(true);
          setTimeout(() => onBlowoutComplete(), 2000);
        }
      } else {
        if (blowStartTime && performance.now() - blowStartTime > 200) {
          blowStartTime = null;
        }
      }

      requestAnimationFrame(detectBlow);
    }

    // Delay mic access request slightly so user isn't overwhelmed
    setTimeout(() => {
      initBlowDetection();
    }, 5000);

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [onBlowoutComplete]);

  return (
    <div className="cake-container">
      {/* 🎙️ Show mic access message if not granted */}
      {!micPermissionGranted && (
        <div className="mic-message">
          <p>🎙️ Please allow microphone access to blow out the candles!</p>
        </div>
      )}

      {/* 🎉 Confetti when blown out */}
      {candlesBlownOut && (
        <motion.div className="confetti-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      )}
      
      {/* 🎂 Cake Base */}
      <div className="cake-base">
        <div className="cake-layer"></div>
        <div className="cake-layer" style={{ top: "40px" }}></div>
        <div className="cake-layer" style={{ top: "60px" }}></div>

        {/* 🍽 Plate */}
        <div className="cake-plate"></div>

        {/* 🕯️ Candles */}
        {!candlesBlownOut && (
          <div className="candle-container">
            <div className="candle"><div className="flame"></div></div>
            <div className="candle"><div className="flame"></div></div>
            <div className="candle"><div className="flame"></div></div>
            <div className="candle"><div className="flame"></div></div>
            <div className="candle"><div className="flame"></div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cake;
