import { FC } from "react";
import "./achievmentLoader.css";

export const AchievmentLoader: FC = () => {
  return (
    <>
      <div className="linear-progress-material">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
      </div>
    </>
  );
};
