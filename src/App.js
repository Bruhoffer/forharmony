import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DrumKit from "./pages/DrumKit";
import BirthdayVideo from "./pages/BirthdayVideo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drumkit" element={<DrumKit />} />
        <Route path="/birthday-video" element={<BirthdayVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
