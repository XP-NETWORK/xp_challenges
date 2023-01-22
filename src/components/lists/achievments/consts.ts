import React from "react";
import { AchivType } from "store/types";
import mailIcon from "../../../assets/img/icons/maild.png";
import invite1Telegram from "../../../assets/img/icons/invite1Telegram.png";
import invite5Telegram from "../../../assets/img/icons/invite5Telegram.png";
import joinXpTelegram from "../../../assets/img/icons/joinXpTelegram.png";
import loginTwitter from "../../../assets/img/icons/loginTwitter.png";
import followXpTwitter from "../../../assets/img/icons/followXpTwitter.png";
import connectWallet from "../../../assets/img/icons/connectWallet.png";
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
      className: "achivCard-pic",
    });
  },
  2: () => {
    return React.createElement("img", {
      src: invite1Telegram,
      className: "achivCard-pic",
    });
  },
  3: () => {
    return React.createElement("img", {
      src: invite5Telegram,
      className: "achivCard-pic",
    });
  },
  4: () => {
    return React.createElement("img", {
      src: followXpTwitter,
      className: "achivCard-pic",
    });
  },
  5: () => {
    return React.createElement("img", {
      src: followXpTwitter,
      className: "achivCard-pic",
    });
  },
  6: () => {
    return React.createElement("img", {
      src: retweet,
      className: "achivCard-pic",
    });
  },
  7: () => {
    return React.createElement("img", {
      src: connectWallet,
      className: "achivCard-pic",
    });
  },
  8: () => {
    return React.createElement("img", {
      src: bridge1,
      className: "achivCard-pic",
    });
  },
  9: () => {
    return React.createElement("img", {
      src: bridge1,
      className: "achivCard-pic",
    });
  },
  10: () => {
    return React.createElement("img", {
      src: bridge3,
      className: "achivCard-pic",
    });
  },
  11: () => {
    return React.createElement("img", {
      src: bridge5,
      className: "achivCard-pic",
    });
  },
  12: () => {
    return React.createElement("img", {
      src: message,
      className: "achivCard-pic",
    });
  },
  13: () => {
    return React.createElement("img", {
      src: message,
      className: "achivCard-pic",
    });
  },
  14: () => {
    return React.createElement("img", {
      src: message,
      className: "achivCard-pic",
    });
  },
  15: () => {
    return React.createElement("img", {
      src: message,
      className: "achivCard-pic",
    });
  },
  16: () => {
    return React.createElement("img", {
      src: message,
      className: "achivCard-pic",
    });
  },
  17: () => {
    return React.createElement("img", {
      src: joinXpTelegram,
      className: "achivCard-pic",
    });
  },
  18: () => {
    return React.createElement("img", {
      src: mailIcon,
      className: "achivCard-pic",
    });
  },
  19: () => {
    return React.createElement("img", {
      src: loginTwitter,
      className: "achivCard-pic",
    });
  },
  20: () => {
    return React.createElement("img", {
      src: bridge3,
      className: "achivCard-pic",
    });
  },
  21: () => {
    return React.createElement("img", {
      src: bridge5,
      className: "achivCard-pic",
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
    dispatch: Dispatch<AnyAction>
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
