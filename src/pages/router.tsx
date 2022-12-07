import React from "react";

import { Routes, Route } from "react-router";

import HomePage from "./Home";
import GameMechanicsPage from "./GameMechanics";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gameMechanics" element={<GameMechanicsPage />} />
      <Route path="/page1" element={false} />
      <Route path="/page2" element={false} />
    </Routes>
  );
};
