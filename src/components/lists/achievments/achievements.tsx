/* eslint-disable @typescript-eslint/ban-ts-comment   */
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { ReduxState } from "store";

import { ReactComponent as Frame } from "../../../assets/img/icons/card-frame.svg";
import ProgressBar from "components/elements/ProgressBar";
import { setJustCompleted } from "../../../store/reducer/global";

import fabric from "../../../store/models/achievment";

import {
  AchievementsProps,
  achievementsBtns,
  achievementsHandlers,
  achievementsPics,
} from "./consts";

function Achievements({ userAchievements, userData }: AchievementsProps) {
  const { achievements, justCompleted, project } = useSelector(
    (state: ReduxState) => ({
      achievements: state.global.achievements,
      userData: state.global.userData,
      justCompleted: state.global.justCompleted,
      project: state.global.project,
    })
  );

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

  return (
    <div className="achievements" id="achivs">
      <h2>Achievements</h2>
      <p>More completed tasks = better chances to win</p>

      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          {achievements.map((item, index) => {
            //const { achievmentNumber, description, name, progressBarLength, link } = achievment
            const achievment = fabric(item, project!);
            const {
              data: { achievmentNumber, name, progressBarLength, description },
            } = achievment;
            const userProgress = achievment.getUserProgress(userAchievements);
            const completed = justCompleted.includes(index);

            let AchievementIcon = achievementsPics[name];

            if (Array.isArray(AchievementIcon)) {
              AchievementIcon = description.includes("Connect wallet")
                ? AchievementIcon[1]
                : AchievementIcon[0];
            }

            return (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={`achivCard-${achievmentNumber}`}
              >
                <div
                  className={`achivCard flexCol  ${
                    userProgress?.completed ? "completedAchievment" : ""
                  }`}
                >
                  <div
                    className={`successOverlay ${completed ? "active" : ""}`}
                  >
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
                  </div>

                  {userData ? (
                    <button
                      onClick={
                        userProgress?.completed
                          ? () => false
                          : achievementsHandlers[name](
                              userData,
                              achievment.getLink(),
                              dispatch
                            )
                      }
                      className={`secondary ${
                        completed ? "justCompleted" : ""
                      } ${userProgress?.completed ? "completed" : ""}`}
                    >
                      {userProgress?.completed
                        ? "COMPLETED 🎉"
                        : achievementsBtns[name]}
                    </button>
                  ) : (
                    <button className="secondary newBackground">
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

/**
 *
 * <div className="proggress">


                    <img src={plus} alt="plus" className="plusPic" />
                    <ul>
                      {Array(progressBarLength)
                        .fill(true)
                        .map((_, idx) => {
                          const imageSet = achievment.getImageSet();
                          return (
                            <li
                              className="flexRow"
                              key={`achivCard-${achievmentNumber}-${idx}`}
                            >
                              <img
                                src={
                                  userProgress
                                    ? idx < userProgress.progressNumber
                                      ? imageSet[1]
                                      : imageSet[0]
                                    : imageSet[1]
                                }
                                alt={`manSilute-${achievmentNumber}-${idx}`}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <ProgressBar
                    current={achievment.getCurrentProgress(userProgress)}
                    total={progressBarLength}
                  />

 */
