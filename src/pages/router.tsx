import { FC } from "react";
import { Routes, Route } from "react-router";

import { useLocation } from "react-router";

import HomePage from "./Home";
import Signup from "./Signup";
import SignupContainer from "components/containers/Signup";

import Welcome from "./homeSections/Welcome";
import Profile from "./homeSections/Profile";

import { ReactComponent as LeftFrame } from "../assets/img/leftFrame.svg";
import { ReactComponent as RightFrame } from "../assets/img/rightFrame.svg";
import { ReactComponent as TopFrame } from "../assets/img/topFrame.svg";

import { useSelector } from "react-redux";
import { ReduxState } from "store";

const noscrollPages = ["signup"];

export const Router: FC = () => {
  const location = useLocation();
  const noscroll = Boolean(
    noscrollPages.find((p) => location.pathname.includes(p))
  );

  const SignUp = SignupContainer(Signup);
  const { telegramUser, init } = useSelector((state: ReduxState) => ({
    telegramUser: state.global.telegramUser,
    init: state.global.init,
  }));

  return (
    <div className={`app ${noscroll ? "noscroll" : ""}`}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage init={init}>
              {telegramUser ? <Profile /> : <Welcome />}
            </HomePage>
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <div className="glowEffect ghostBg"></div>
      <LeftFrame className="frame left" />
      <RightFrame className="frame right" />
      {!noscroll && <TopFrame className="frame top" />}
    </div>
  );
};
