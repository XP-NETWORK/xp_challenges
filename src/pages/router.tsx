import { FC, useEffect } from "react";
import { Routes, Route } from "react-router";

import { useLocation } from "react-router";

import HomePage from "./Home";

import { Welcome } from "./homeSections/Welcome";
import Profile from "./homeSections/Profile";
import LeaderBoard from "./homeSections/LeaderBoard";
import Collection from "./homeSections/Collection";
import Modal from "components/modals";

// import { ReactComponent as TopFrame } from "../assets/img/topFrame.svg";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "store";
import { getUserByUniqueId } from "store/reducer/global";
import { loadTelegramUniqueId } from "utils";

import { setModal } from "store/reducer/global";

const noscrollPages = ["signup"];

export const Router: FC = () => {
  const location = useLocation();
  const noscroll = Boolean(
    noscrollPages.find((p) => location.pathname.includes(p))
  );

  const dispatch = useDispatch();
  const { telegramUser, init, modal } = useSelector((state: ReduxState) => ({
    telegramUser: state.global.telegramUser,
    init: state.global.init,
    modal: state.global.modal,
  }));

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let interval: any;
    if (!telegramUser) {
      interval = setInterval(() => {
        loadData();
      }, 5000);
    } else {
      if (telegramUser && !localStorage.getItem("CHALLENGE_EXIST")) {
        localStorage.setItem("CHALLENGE_EXIST", "true");

        dispatch(
          setModal({
            type: "Success",
            telegramAccount: telegramUser.telegramUsername,
            telegramPic: telegramUser.telegramPhotoUrl,
          })
        );
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [telegramUser]);

  const loadData = async () => {
    await dispatch(getUserByUniqueId(loadTelegramUniqueId() as any) as any);
  };

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
      </Routes>
      {modal && <Modal modal={modal} />}
    </div>
  );
};
