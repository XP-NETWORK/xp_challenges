import React from "react";

import { Routes, Route } from "react-router";

import HomePage from "./Home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
