import React from "react";
import { saveTelegramUniqueId } from "utils";
import { v4 as uuidv4 } from "uuid";

export const TelegramButtonV2 = ({ classes }: { classes?: string }) => {
  const unique = uuidv4();
  const openInNewTab = () => {
    window.open(`https://t.me/XpRegDemobot/?start=${unique}`, "_blank", "noreferrer");
    saveTelegramUniqueId(unique);
    localStorage.removeItem("CHALLENGE_EXIST");
  };

  return (
    <button className={classes ? classes : "accent"} onClick={openInNewTab}>
        Connect with Telegram
    </button>
  );
};
