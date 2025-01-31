import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DragPapers from "./pages/DragPapers";
import BirthdayVideo from "./pages/BirthdayVideo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drag-papers" element={<DragPapers />} />
        <Route path="/birthday-video" element={<BirthdayVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
