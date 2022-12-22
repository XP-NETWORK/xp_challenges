import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { ReduxState } from "store";

import { AchivType } from "store/types";

import tgAchiv from "../../assets/img/icons/tgAchiv.svg";
import twitAchiv from "../../assets/img/icons/twiter_mockup copy 1 (1).png";
import bridgeAchiv from "../../assets/img/icons/xpicon.svg";

import frame from "../../assets/img/icons/achivFrame.svg";

import { IUserAchievments } from "store/models/user";

import ProgressBar from "components/elements/ProgressBar";

import { setJustCompleted } from "../../store/reducer/global";

import person from "../../assets/img/icons/AchivPerson.svg";
import personCompleted from "../../assets/img/icons/Group 3324.svg";
import plus from "../../assets/img/icons/+.svg";

import nftIcon from "../../assets/img/icons/nftIcon.svg";
import nftIconCompleted from "../../assets/img/icons/completedNftIcon.svg";

type AchievementsProps = {
  userAchievements?: IUserAchievments[];
};

const achievementsPics = {
  [AchivType.Telegram]: tgAchiv,
  [AchivType.Twitter]: twitAchiv,
  [AchivType.Bridge]: bridgeAchiv,
};

type actionTypesImagesType = {
  Invite: string[];
  Send: string[];
  Transfer: string[];
};

const actionTypesImages: actionTypesImagesType = {
  Invite: [person, personCompleted],
  Send: [person, personCompleted],
  Transfer: [nftIcon, nftIconCompleted],
};

const achievementsBtns = {
  [AchivType.Telegram]: "go to telegram",
  [AchivType.Twitter]: "go to twitter",
  [AchivType.Bridge]: "go to bridge",
};

function Achievements({ userAchievements }: AchievementsProps) {
  console.log(userAchievements, "userAchievements");
  //const [justCompleted, setCompleted] = useState<number | undefined>(undefined);
  //const [trailingCopy, setCopy] = useState<IUserAchievments[]>([]);

  //all achievements
  const { achievements, justCompleted } = useSelector((state: ReduxState) => ({
    achievements: state.global.achievements,
    userData: state.global.userData,
    justCompleted: state.global.justCompleted,
  }));

  const dispatch = useDispatch();

  console.log(justCompleted, "justCompleted");

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
              { achievmentNumber, description, name, progressBarLength },
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
