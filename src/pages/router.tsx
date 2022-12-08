import React from "react";

import { Routes, Route } from "react-router";

import HomePage from "./Home";

import { ReactComponent as LeftFrame } from "../assets/img/leftFrame.svg";
import { ReactComponent as RightFrame } from "../assets/img/rightFrame.svg";
import { ReactComponent as TopFrame } from "../assets/img/topFrame.svg";

export const Router = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <div className="glowEffect ghostBg"></div>
      <LeftFrame className="frame left" />
      <RightFrame className="frame right" />
      <TopFrame className="frame top" />
    </div>
  );
};
