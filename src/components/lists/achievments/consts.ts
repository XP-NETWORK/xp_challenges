import React from "react";
import { AchivType } from "store/types";
import mailIcon from "../../../assets/img/icons/maild.png";
import invite1Telegram from "../../../assets/img/icons/invite1Telegram.png";
import invite5Telegram from "../../../assets/img/icons/invite5Telegram.png";
import joinXpTelegram from "../../../assets/img/icons/joinXpTelegram.png";
import loginTwitter from "../../../assets/img/icons/loginTwitter.png";
import followXpTwitter from "../../../assets/img/icons/followXpTwitter.png";
import wallet5 from "../../../assets/img/icons/wallet5.png";
import newusers from "../../../assets/img/icons/newusers.png";
import message from "../../../assets/img/icons/message.png";
import retweet from "../../../assets/img/icons/retweet.png";
import bridge1 from "../../../assets/img/icons/bridge1.png";
import bridge3 from "../../../assets/img/icons/bridge3.png";
import bridge5 from "../../../assets/img/icons/bridge5.png";
import { IUserAchievments, UserData } from "store/models/user";
import person from "../../../assets/img/icons/AchivPerson.svg";
import personCompleted from "../../../assets/img/icons/Group 3324.svg";
import nftIcon from "../../../assets/img/icons/nftIcon.svg";
import nftIconCompleted from "../../../assets/img/icons/completedNftIcon.svg";
import { config } from "../../../index";
import { Dispatch } from "hoist-non-react-statics/node_modules/@types/react";
import { setModal } from "store/reducer/global";
import { AnyAction } from "redux";

export type AchievementsProps = {
  userAchievements?: IUserAchievments[];
  userData?: UserData | undefined;
};

export const achievementsPics = {
  1: () => {
    return React.createElement("img", {
      src: invite1Telegram,
      className: "AchievementIcon",
    });
  },
  2: () => {
    return React.createElement("img", {
      src: newusers,
      className: "AchievementIcon",
    });
  },
  3: () => {
    return React.createElement("img", {
      src: invite5Telegram,
      className: "AchievementIcon",
    });
  },
  4: () => {
    return React.createElement("img", {
      src: followXpTwitter,
      className: "AchievementIcon",
    });
  },
  5: () => {
    return React.createElement("img", {
      src: followXpTwitter,
      className: "AchievementIcon",
    });
  },
  6: () => {
    return React.createElement("img", {
      src: retweet,
      className: "AchievementIcon",
    });
  },
  7: () => {
    
    return React.createElement("img", {
      src: wallet5,
      className: "AchievementIcon",
    });
  },
  8: () => {
    return React.createElement("img", {
      src: bridge1,
      className: "AchievementIcon",
    });
  },
  9: () => {
    return React.createElement("img", {
      src: bridge1,
      className: "AchievementIcon",
    });
  },
  10: () => {
    return React.createElement("img", {
      src: bridge3,
      className: "AchievementIcon",
    });
  },
  11: () => {
    return React.createElement("img", {
      src: bridge5,
      className: "AchievementIcon",
    });
  },
  12: () => {
    return React.createElement("img", {
      src: message,
      className: "AchievementIcon",
    });
  },
  13: () => {
    return React.createElement("img", {
      src: message,
      className: "AchievementIcon",
    });
  },
  14: () => {
    return React.createElement("img", {
      src: message,
      className: "AchievementIcon",
    });
  },
  15: () => {
    return React.createElement("img", {
      src: message,
      className: "AchievementIcon",
    });
  },
  16: () => {
    return React.createElement("img", {
      src: message,
      className: "AchievementIcon",
    });
  },
  17: () => {
    return React.createElement("img", {
      src: joinXpTelegram,
      className: "AchievementIcon",
    });
  },
  18: () => {
    return React.createElement("img", {
      src: mailIcon,
      className: "AchievementIcon",
    });
  },
  19: () => {
    return React.createElement("img", {
      src: loginTwitter,
      className: "AchievementIcon",
    });
  },
  20: () => {
    return React.createElement("img", {
      src: bridge3,
      className: "AchievementIcon",
    });
  },
  21: () => {
    return React.createElement("img", {
      src: bridge5,
      className: "AchievementIcon",
    });
  },
};

export type actionTypesImagesType = {
  Invite: string[];
  Send: string[];
  Transfer: string[];
};

export const actionTypesImages: actionTypesImagesType = {
  Invite: [person, personCompleted],
  Send: [person, personCompleted],
  Transfer: [nftIcon, nftIconCompleted],
};

export const achievementsBtns = {
  [AchivType.Telegram]: "go to telegram",
  [AchivType.Twitter]: "go to twitter",
  [AchivType.Bridge]: "go to bridge",
  [AchivType.Subscribe]: "go to Subscribe",
};

export const achievementsHandlers = {
  [AchivType.Telegram]: (
    _: UserData | undefined,
    link = config._DEFAULT_TELEGRAM_LINK
  ) => () => window.open(link),
  [AchivType.Twitter]: (
    userData: UserData | undefined,
    link = config._DEFAULT_TWITTER_LINK,
    dispatch: Dispatch<AnyAction>,
    achievmentNumber: number,
    setClicked: React.Dispatch<React.SetStateAction<string[]>>
  ) => () => {
    if (!userData?.twitterUserName) {
      dispatch(
        setModal({
          type: "TwitterAuth",
          text: "",
        })
      );
      return;
    }
    const clicked = localStorage.getItem('clicked');
    if (!clicked) {
      localStorage.setItem('clicked', JSON.stringify([String(achievmentNumber)]));
      setClicked([String(achievmentNumber)])
    } else {
      const par = JSON.parse(clicked)
      if (par.indexOf(String(achievmentNumber)) === -1) {
        par.push(String(achievmentNumber));
        setClicked(par)
        localStorage.setItem('clicked', JSON.stringify(par));
      }
    }
    return window.open(link);

    /*return !userData?.twitterUserName
      ? window.open(config._TWITTER_AUTH, "_self")
      : window.open(link);*/
  },
  [AchivType.Bridge]: (
    userData: UserData | undefined,
    link = config._DEFAULT_BRIDGE_LINK,
    dispatch: Dispatch<AnyAction>
  ) => () => {
    if (!userData?.telegramUsername) {
      return;
    }

    if (!userData?.wallets?.length) {
      dispatch(
        setModal({
          type: "WalletList",
          text: "Connect Wallet",
        })
      );
      return;
    }
    link &&
      dispatch(
        setModal({
          type: "Bridge",
        })
      );
  },
  [AchivType.Subscribe]: (
    userData: UserData | undefined,
    link = config._DEFAULT_BRIDGE_LINK,
    dispatch: Dispatch<AnyAction>
  ) => () => {
    if (!userData?.email && link) {
      dispatch(
        setModal({
          type: "EmailSubscribe",
        })
      );
      return;
    }
  },
};
