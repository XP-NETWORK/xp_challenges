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

function Achievements({ userAchievements, userData }: AchievementsProps) {
  const [clicked, setClicked] = useState<string[]>([]);
  const { achievements, justCompleted, project } = useSelector((state: ReduxState) => ({
    achievements: state.global.achievements,
    userData: state.global.userData,
    justCompleted: state.global.justCompleted,
    project: state.global.project,
    clickedAchiev: state.global.clickedAchiev,
  }));

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
  }, [clicked]);

  return (
    <div className="achievements" id="achivs">
      <h2>Achievements</h2>
      <p>More completed tasks = better chances to win</p>

      <div className="container" style={{ marginTop: "60px" }}>
        <div className="row">
          {achievements.map((item, index) => {
            //const { achievmentNumber, description, name, progressBarLength, link } = achievment
            const achievment = fabric(item, project!);
            const {
              data: { achievmentNumber, name, progressBarLength, description },
            } = achievment;
            const userProgress = achievment.getUserProgress(userAchievements);
            const completed = justCompleted.includes(index);

            //@ts-ignore
            let AchievementIcon = achievementsPics[achievmentNumber];

            if (Array.isArray(AchievementIcon)) {
              AchievementIcon = description.includes("Connect wallet")
                ? AchievementIcon[1]
                : AchievementIcon[0];
            }

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
                  <Frame className="cardFrame" />
                  <AchievementIcon className="achivCard-pic" />
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
                              achievment.getLink(),
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
                        : clicked?.includes(String(achievmentNumber))
                        ? "Validating Achievment"
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
