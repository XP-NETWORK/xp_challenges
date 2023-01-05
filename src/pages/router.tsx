import { FC, useMemo } from "react";
import { Routes, Route } from "react-router";

import { useLocation } from "react-router";

import HomePage from "./Home";
import Signup from "./Signup";
import SignupContainer from "components/containers/Signup";

import Welcome from "./homeSections/Welcome";
import Profile from "./homeSections/Profile";
import LeaderBoard from "./homeSections/LeaderBoard";
import Collection from "./homeSections/Collection";
import Modal from "components/modals";

// import { ReactComponent as TopFrame } from "../assets/img/topFrame.svg";

import { useSelector } from "react-redux";
import { ReduxState } from "store";

const noscrollPages = ["signup"];

export const Router: FC = () => {
  const location = useLocation();
  const noscroll = Boolean(
    noscrollPages.find((p) => location.pathname.includes(p))
  );

  const { telegramUser, init, modal } = useSelector((state: ReduxState) => ({
    telegramUser: state.global.telegramUser,
    init: state.global.init,
    modal: state.global.modal,
  }));

  const MemoedSignUp = useMemo(() => SignupContainer(Signup), ["signup"]);

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

        <Route
          path="/leaderboard"
          element={
            <HomePage init={init}>
              <LeaderBoard />
            </HomePage>
          }
        />

        <Route
          path="/collection"
          element={
            <HomePage init={init}>
              <Collection />
            </HomePage>
          }
        />

        <Route path="/signup" element={<MemoedSignUp />} />
      </Routes>
      {modal && <Modal modal={modal} />}


    </div>
  );
};
