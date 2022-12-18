import React from "react";

import { useSelector } from "react-redux";

import { ReduxState } from "store";

import { AchivType } from "store/types";

import tgAchiv from "../../assets/img/icons/tgAchiv.svg";
import manSilute from "../../assets/img/icons/manSiluet.svg";
import frame from "../../assets/img/icons/achivFrame.svg";

function Achievements() {
  AchivType.Telegram;
  const achievements = useSelector(
    (state: ReduxState) => state.global.achievements
  );
  console.log(achievements, "achievements");

  const achievementsPics = {
    [AchivType.Telegram]: tgAchiv,
    [AchivType.Twitter]: tgAchiv,
    [AchivType.Bridge]: tgAchiv,
  };

  const achievementsBtns = {
    [AchivType.Telegram]: "go to telegram",
    [AchivType.Twitter]: "go to twitter",
    [AchivType.Bridge]: "go to bridge",
  };

  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <p>Try to complete all the tasks</p>

      <div className="container">
        <div className="row">
          {achievements.map(
            ({ achievmentNumber, description, name, progressBarLength }) => (
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  key={`achivCard-${achievmentNumber}`}
                  className="achivCard flexCol"
                >
                  <img src={frame} alt="frame" className="frame" />
                  <div className="proggress">
                    <img src={achievementsPics[name]} alt="" />
                    <ul>
                      {Array(progressBarLength)
                        .fill(true)
                        .map((_, idx) => (
                          <li key={`achivCard-${achievmentNumber}-${idx}`}>
                            <img
                              src={manSilute}
                              alt={`manSilute-${achievmentNumber}-${idx}`}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <p>{description}</p>
                  <button className="secondary">
                    {achievementsBtns[name]}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
