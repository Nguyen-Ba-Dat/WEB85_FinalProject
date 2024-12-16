import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TrelloBoard from "../components/TrelloBoard";
import Home from "../components/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:boardID" element={<TrelloBoard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
