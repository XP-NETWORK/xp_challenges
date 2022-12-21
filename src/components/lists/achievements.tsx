import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { ReduxState } from "store";

import { AchivType } from "store/types";

import tgAchiv from "../../assets/img/icons/tgAchiv.svg";

import frame from "../../assets/img/icons/achivFrame.svg";

import { IUserAchievments } from "store/models/user";

import ProgressBar from "components/elements/ProgressBar";

import person from "../../assets/img/icons/AchivPerson.svg";
import personCompleted from "../../assets/img/icons/Group 3324.svg";
import plus from "../../assets/img/icons/+.svg";

type AchievementsProps = {
  userAchievements?: IUserAchievments[];
};

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

  console.log(justCompleted, "justCompleted");

  useEffect(() => {
    //const completed = userAchievements?.filter((a) => a.completed) || [];
    /*for (const achiv of completed) {
      const prev = trailingCopy.find(
        (a) => a.achievmentNumber === achiv.achievmentNumber
      );
      if (prev?.completed !== achiv.completed) {
        console.log("we have a winner");
        console.log(prev);
        console.log(achiv);
        const idx = userAchievements?.findIndex(
          (a) => a.achievmentNumber === achiv.achievmentNumber
        );
        console.log(idx, "idx");
        setCompleted(idx);
      }
    }*/
    //userAchievements && setCopy(userAchievements);
  }, [userAchievements]);

  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <p>Try to complete all the tasks</p>

      <div className="container">
        <div className="row">
          {achievements.map(
            ({ achievmentNumber, description, name, progressBarLength }) => {
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
                        justCompleted !== undefined ? "active" : ""
                      }`}
                    ></div>
                    <img src={frame} alt="frame" className="frame" />
                    <div className="proggress">
                      <img src={achievementsPics[name]} alt="achivPic" />
                      <img src={plus} alt="plus" className="plusPic" />
                      <ul>
                        {Array(progressBarLength)
                          .fill(true)
                          .map((_, idx) => (
                            <li key={`achivCard-${achievmentNumber}-${idx}`}>
                              <img
                                src={
                                  userProgress
                                    ? idx < userProgress.progressNumber
                                      ? personCompleted
                                      : person
                                    : personCompleted
                                }
                                alt={`manSilute-${achievmentNumber}-${idx}`}
                              />
                            </li>
                          ))}
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
