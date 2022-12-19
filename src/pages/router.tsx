import { FC } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./Home";

import { ReactComponent as LeftFrame } from "../assets/img/leftFrame.svg";
import { ReactComponent as RightFrame } from "../assets/img/rightFrame.svg";
import { ReactComponent as TopFrame } from "../assets/img/topFrame.svg";

const IOP = () => <div className="signupPage">dasdOP</div>;

export const Router: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<IOP />} />
      </Routes>
      <div className="glowEffect ghostBg"></div>
      <LeftFrame className="frame left" />
      <RightFrame className="frame right" />
      <TopFrame className="frame top" />
    </div>
  );
};
