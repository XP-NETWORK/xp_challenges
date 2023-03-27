import React from "react";
import dummy3 from "../../assets/img/dummy3.png";

export const Dummyx = () => {
  return (
    <div
      onClick={() =>
        window.open(
          `https://t.me/XP_NETWORK_Bridge_Support_Bot?start=startwithxpbot`,
          "_blank",
          "noreferrer"
        )
      }
      className="dummy2Container"
    >
      <div className="svg-container">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="100" height="100" fill="#000" />
        </svg>
        <img src={dummy3} alt="Your Image" className="svg-image" />
      </div>
      <span className="dummy2Text">NEED HELP?</span>
    </div>
  );
};
