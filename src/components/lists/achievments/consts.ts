import React from "react";

import { AchivType } from "store/types";

import { ReactComponent as TelegramAchiv } from "../../../assets/img/icons/newTelegramIcon.svg";

import { ReactComponent as twitAchiv } from "../../../assets/img/icons/newTwitterIcon.svg";

import { ReactComponent as bridgeAchiv } from "../../../assets/img/icons/newBridgeIcon.svg";

import { ReactComponent as walletIcon } from "../../../assets/img/icons/newWalletIcon.svg";

import mailIcon from "../../../assets/img/icons/maild.png";

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
  [AchivType.Telegram]: TelegramAchiv,
  [AchivType.Twitter]: twitAchiv,
  [AchivType.Bridge]: [bridgeAchiv, walletIcon],
  [AchivType.Subscribe]: () => {
    return React.createElement("img", {
      src: mailIcon,
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
          text: "login Twitter",
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
      return window.open("/signup", "_self");
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
    return window.open(link);
  },
  [AchivType.Subscribe]: (
    userData: UserData | undefined,
    link = config._DEFAULT_BRIDGE_LINK,
    dispatch: Dispatch<AnyAction>
  ) => () => {
    if (!userData?.email && link) {
      dispatch(
        setModal({
          type: "EmailSubscribe"
        })
      );
      return;
    }
  },
};
