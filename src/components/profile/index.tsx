import { useEffect, useState, FC } from "react";
import { ReactComponent as Frame } from "../../assets/svgs/profile/profileFrame.svg";

import { ProgressBarProps } from "components/elements/ProgressBar";
import { useWindowSize } from "../../hooks/useSize";

import "./profile.css";
import { ProjectTimer } from "components/elements/ProjectTimer";

function waitForElm(element: HTMLDivElement): Promise<HTMLDivElement> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(element);
    }, 240);
  });
}

interface IProfileData {
  telegramData: any
}

export const ProfileDetails: FC<ProgressBarProps & IProfileData> = ({
  current,
  total,
  telegramData,
}) => {
  const [innerBarWidth, setWidth] = useState(0);
  console.log(innerBarWidth);

  const size = useWindowSize();

  let bar: HTMLDivElement | undefined = undefined;

  useEffect(() => {
    if (bar && current && total) {
      waitForElm(bar).then((elm) => {
        setWidth((current * elm?.offsetWidth) / total);
      });
    }
  }, [current, total, bar, size.width]);

  return (
    <>
      <div className="profileContainer">
        <Frame className="cardFrameProfile" />
        <div className="flexColumnProfile">
        <div className="userFrame">
          <div className="innerUserFrame">
            </div>
        </div>

          <div className="profileTopFlex">
            <ProjectTimer />
            <button className="viewLeaderBoardButton">VIEW LEADERBOARD</button>
          </div>
          <div className="profileNameStyle">@{telegramData?.telegramUsername}</div>
          <div className="progressBar profileProgressBar">
            <div className="rate rateFlexContainer">
              <div className="rateText">YOUR SCORE</div>
              <div className="rateText">
                <span>{current}</span>
                <span className="rateTextOp">/{total}</span>
              </div>
            </div>
            <div className="barWrap flexRow profileWarpBar">
              <div className="bar profileProgressBar">
                <div
                  className={`inner flexRow ${current === 0 ? "empty" : ""}`}
                  ref={(node) => {
                    if (node) {
                      bar = node;
                    }
                  }}
                >
                  {Array(total)
                    .fill(true)
                    .map((_, idx) => (
                      <div
                        key={`innerSegment-${idx}-${Math.random()}`}
                        className={`inner-segment ${
                          idx === current - 1 ? "last" : ""
                        } ${idx < 8 ? "completed" : " completed notCompleted"}`}
                      ></div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
