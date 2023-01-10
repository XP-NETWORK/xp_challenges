import React from "react";

import { saveTelegramUniqueId } from "utils";
import { v4 as uuidv4 } from "uuid";

export const TelegramButton = () => {
  const unique = uuidv4();
  const openInNewTab = () => {
    window.open(
      `https://t.me/challengeRegestrationBot/?start=${unique}`,
      "_blank",
      "noreferrer"
    );
    saveTelegramUniqueId(unique);
    localStorage.removeItem("CHALLENGE_EXIST");
  };

  return (
    <button className="accent" onClick={openInNewTab}>
      Connect with Telegram
    </button>
  );
};
