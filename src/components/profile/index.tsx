import { useEffect, useState, FC } from "react";
import { ReactComponent as Frame } from "../../assets/svgs/profile/profileFrame.svg";

import { ProgressBarProps } from "components/elements/ProgressBar";
import { useWindowSize } from "../../hooks/useSize";

import "./profile.css";

function waitForElm(element: HTMLDivElement): Promise<HTMLDivElement> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(element);
    }, 240);
  });
}

export const ProfileDetails: FC<ProgressBarProps> = ({ current, total }) => {
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
        <Frame className="cardFrameProfile"/>
        <div className="progressBar">
          <div className="rate rateFlexContainer">
            <div className="rateText">YOUR SCORE</div>
            <div>
              <span>{1}</span>/{2}
            </div>
          </div>
          <div className="barWrap flexRow profileWarpBar">
            <div className="bar">
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
                      } ${idx < current ? "completed" : ""}`}
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
