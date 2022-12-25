import { AchivType } from "store/types";

import tgAchiv from "../../../assets/img/icons/tgAchiv.svg";
import twitAchiv from "../../../assets/img/icons/twiter_mockup copy 1 (1).png";
import bridgeAchiv from "../../../assets/img/icons/xpicon.svg";

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
  [AchivType.Telegram]: tgAchiv,
  [AchivType.Twitter]: twitAchiv,
  [AchivType.Bridge]: bridgeAchiv,
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
};

export const achievementsHandlers = {
  [AchivType.Telegram]: () => () => false,
  [AchivType.Twitter]: (
    userData: UserData | undefined,
    link = config._DEFAULT_TWITTER_LINK
  ) => () => {
    return !userData?.twitterUserName
      ? window.open(config._TWITTER_AUTH, "_self")
      : window.open(link);
  },
  [AchivType.Bridge]: (
    userData: UserData | undefined,
    link = config._DEFAULT_BRIDGE_LINK,
    dispatch: Dispatch<AnyAction>
  ) => () => {
    if (!userData?.wallets?.length) {
      dispatch(
        setModal({
          type: "WalletList",
          text:
            "You have not connected any wallets yet. To do Bridge achievements you have to add at least one",
        })
      );
      return;
    }
    return window.open(link);
  },
};
