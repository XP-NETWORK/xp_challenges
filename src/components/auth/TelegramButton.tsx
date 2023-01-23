import React from "react";
import { saveTelegramUniqueId } from "utils";
import { v4 as uuidv4 } from "uuid";
import Vector from "../../assets/svgs/singup/Vector.svg";

export const TelegramButton = ({ classes }: { classes?: string }) => {
  const unique = uuidv4();
  const openInNewTab = () => {
    window.open(`https://t.me/challengeRegestrationBot/?start=${unique}`, "_blank", "noreferrer");
    saveTelegramUniqueId(unique);
    localStorage.removeItem("CHALLENGE_EXIST");
  };

  return (
    <button className={classes ? classes : "accent"} onClick={openInNewTab}>
      <span>
        <img style={{ marginRight: "2px" }} src={Vector} />
        <span> Connect with Telegram</span>
      </span>
    </button>
  );
};
