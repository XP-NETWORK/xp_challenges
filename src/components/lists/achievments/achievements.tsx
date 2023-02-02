/* eslint-disable @typescript-eslint/ban-ts-comment  */
/* eslint-disable no-constant-condition  */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "store";
import { ReactComponent as Frame } from "../../../assets/img/icons/card-frame.svg";
import ProgressBar from "components/elements/ProgressBar";
import { setJustCompleted, setModal } from "../../../store/reducer/global";
import fabric from "../../../store/models/achievment";
import {
  AchievementsProps,
  achievementsBtns,
  achievementsHandlers,
  achievementsPics,
} from "./consts";
import { AchievmentLoader } from "../../../components/achievmentLoader/index";
import { ReactComponent as Vector } from "../../../assets/img/icons/Vector.svg";
import xpMiniIcon from "../../../assets/img/xpMiniIcon.png";

function Achievements({ userAchievements, userData }: AchievementsProps) {
  const [clicked, setClicked] = useState<string[]>([]);
  const { achievements, justCompleted, project } = useSelector((state: ReduxState) => ({
    achievements: state.global.achievements,
    userData: state.global.userData,
    justCompleted: state.global.justCompleted,
    project: state.global.project,
    clickedAchiev: state.global.clickedAchiev,
  }));

  const noIcons = [1, 2, 3];
  const twitter = [12, 13, 14, 15];

  const dispatch = useDispatch();

  useEffect(() => {
    if (justCompleted?.length) {
      setTimeout(() => {
        const completed = [...justCompleted];
        completed.pop();
        dispatch(setJustCompleted(completed));
      }, 3000);
    }
  }, [justCompleted]);

  useEffect(() => {
    const clicked = localStorage.getItem("clicked");
    setClicked(JSON.parse(clicked || "[]"));
  }, []);

  return (
    <div className="achievements" id="achivs">
      <div className="container" style={{ marginTop: "60px" }}>
        <div className="row">
          {achievements.map((item, index) => {
            const achievment = fabric(item, project!);
            const {
              data: { miniIcon, achievmentNumber, name, progressBarLength, description },
            } = achievment;
            const userProgress = achievment.getUserProgress(userAchievements);
            const completed = justCompleted.includes(index);
            //@ts-ignore
            const AchievementIcon = achievementsPics[achievmentNumber];
            return (
              <div className="col-12 col-md-6 col-lg-4" key={`achivCard-${achievmentNumber}`}>
                <div
                  className={`achivCard flexCol  ${
                    userProgress?.completed ? "completedAchievment" : ""
                  }`}
                >
                  <div className={`successOverlay ${completed ? "active" : ""}`}>
                    <span>Completed</span>
                  </div>

                  <div className="cont">
                    <Vector className="vector" />
                    <AchievementIcon />
                    {!noIcons.includes(Number(achievmentNumber)) && (
                      <img
                        className="xpMiniIcon"
                        src={miniIcon ? miniIcon : xpMiniIcon}
                        alt="xpMiniIcon"
                      />
                    )}
                  </div>

                  <Frame className="cardFrame" />

                  <div className="achivCard-content flexCol">
                    <ProgressBar
                      current={achievment.getCurrentProgress(userProgress)}
                      total={progressBarLength}
                    />
                    <p>{description}</p>
                    {clicked?.includes(String(achievmentNumber)) && !userProgress?.completed && (
                      <AchievmentLoader />
                    )}
                  </div>

                  {userData ? (
                    <button
                      onClick={
                        userProgress?.completed
                          ? () => false
                          : achievementsHandlers[name](
                              userData,
                              twitter.includes(achievmentNumber)
                                ? async () => await achievment.getLink(achievmentNumber)
                                : undefined,
                              dispatch,
                              achievmentNumber,
                              setClicked
                            )
                      }
                      className={`secondary ${completed ? "justCompleted" : ""} ${
                        userProgress?.completed ? "completed" : ""
                      }`}
                    >
                      {userProgress?.completed
                        ? "COMPLETED 🎉"
                        : achievmentNumber === 7
                        ? "Connect wallet"
                        : achievementsBtns[name]}
                    </button>
                  ) : (
                    <button
                      className="secondary newBackground"
                      onClick={() => dispatch(setModal({ type: "TelegramAuth" }))}
                    >
                      Get started
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
