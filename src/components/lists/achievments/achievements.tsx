import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { ReduxState } from "store";


import frame from "../../../assets/img/icons/achivFrame.svg";



import ProgressBar from "components/elements/ProgressBar";

import { setJustCompleted } from "../../../store/reducer/global";


import plus from "../../../assets/img/icons/+.svg";

import {AchievementsProps, achievementsBtns, achievementsHandlers, achievementsPics, actionTypesImages, actionTypesImagesType} from './consts'

function Achievements({ userAchievements, userData }: AchievementsProps) {


  const { achievements, justCompleted } = useSelector((state: ReduxState) => ({
    achievements: state.global.achievements,
    userData: state.global.userData,
    justCompleted: state.global.justCompleted,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (justCompleted.length) {
      setTimeout(() => {
        const completed = [...justCompleted];
        completed.pop();
        dispatch(setJustCompleted(completed));
      }, 3000);
    }
  }, [justCompleted]);

  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <p>Try to complete all the tasks</p>

      <div className="container">
        <div className="row">
          {achievements.map(
            (
              { achievmentNumber, description, name, progressBarLength ,link },
              index
            ) => {
              const userProgress = userAchievements?.find(
                (a) => a.achievmentNumber === achievmentNumber
              );

              return (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={`achivCard-${achievmentNumber}`}
                >
                  <div className="achivCard flexCol">
                    <div
                      className={`successOverlay ${
                        justCompleted.includes(index) ? "active" : ""
                      }`}
                    >
                      <span>Completed</span>
                    </div>
                    <img src={frame} alt="frame" className="frame" />
                    <div className="proggress">
                      <img
                        src={achievementsPics[name]}
                        alt="achivPic"
                        className="achivCard-pic"
                      />
                      <img src={plus} alt="plus" className="plusPic" />
                      <ul>
                        {Array(progressBarLength)
                          .fill(true)
                          .map((_, idx) => {
                            const setKey =
                              Object.keys(actionTypesImages).find((key) =>
                                description.includes(key)
                              ) || "Invite";
                            const imageSet =
                              actionTypesImages[
                                setKey as keyof actionTypesImagesType
                              ];

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
                      current={
                        userProgress
                          ? userProgress.progressNumber > progressBarLength
                            ? progressBarLength
                            : userProgress.progressNumber
                          : 0
                      }
                      total={progressBarLength}
                    />

                    <p>{description}</p>
                    <button
                      onClick={
                        userProgress?.completed
                          ? () => false
                          : achievementsHandlers[name](userData, link)
                      }
                      className={`secondary ${
                        userProgress?.completed ? "completed" : ""
                      }`}
                    >
                      {userProgress?.completed
                        ? "COMPLETED 🎉"
                        : achievementsBtns[name]}
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
