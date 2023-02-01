import React from "react";
import { AchivType } from "store/types";
import subscribetonewsletter from "../../../assets/img/icons/subscribetonewsletter.png";
import adduserpartners from "../../../assets/img/adduserpartners.png";
import add3userspartners from "../../../assets/img/add3userspartners.png";
import add5userspartners from "../../../assets/img/add5userspartners.png";
import retweet12 from "../../../assets/img/retweet12.png";
import telegram1 from "../../../assets/img/icons/telegram1.png";
import twitter from "../../../assets/img/icons/twitter.png";
import connectWallet1 from "../../../assets/img/icons/connectWallet1.png";
import Amessage from "../../../assets/img/icons/Amessage.png";
import Bmessage from "../../../assets/img/icons/Bmessages.png";
import Cmessage from "../../../assets/img/icons/Cmessages.png";
import Dmessage from "../../../assets/img/icons/Dmessages.png";
import Emessage from "../../../assets/img/icons/Emessages.png";
import bridge3nfts from "../../../assets/img/icons/bridge3nfts.png";
import bridge5nfts from "../../../assets/img/icons/bridge5nfts.png";
import bridgenft from "../../../assets/img/icons/bridgenft.png";
import bridge3nftspartners from "../../../assets/img/bridge3nftspartners.png";
import bridge5nftspartners from "../../../assets/img/bridge5nftspartners.png";
import bridgenftpartners from "../../../assets/img/bridgenftpartners.png";
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
      src: adduserpartners,
      className: "AchievementIcon",
    });
  },
  2: () => {
    return React.createElement("img", {
      src: add3userspartners,
      className: "AchievementIcon",
    });
  },
  3: () => {
    return React.createElement("img", {
      src: add5userspartners,
      className: "AchievementIcon",
    });
  },
  4: () => {
    return React.createElement("img", {
      src: twitter,
      className: "AchievementIcon",
    });
  },
  5: () => {
    return React.createElement("img", {
      src: twitter,
      className: "AchievementIcon",
    });
  },
  6: () => {
    return React.createElement("img", {
      src: retweet12,
      className: "AchievementIconRet",
    });
  },
  7: () => {

    return React.createElement("img", {
      src: connectWallet1,
      className: "AchievementIcon",
    });
  },
  8: () => {
    return React.createElement("img", {
      src: bridgenft,
      className: "AchievementIcon",
    });
  },
  9: () => {
    return React.createElement("img", {
      src: bridgenftpartners,
      className: "AchievementIcon",
    });
  },
  10: () => {
    return React.createElement("img", {
      src: bridge3nfts,
      className: "AchievementIcon",
    });
  },
  11: () => {
    return React.createElement("img", {
      src: bridge5nfts,
      className: "AchievementIcon",
    });
  },
  12: () => {
    return React.createElement("img", {
      src: Amessage,
      className: "AchievementIcon",
    });
  },
  13: () => {
    return React.createElement("img", {
      src: Bmessage,
      className: "AchievementIcon",
    });
  },
  14: () => {
    return React.createElement("img", {
      src: Cmessage,
      className: "AchievementIcon",
    });
  },
  15: () => {
    return React.createElement("img", {
      src: Dmessage,
      className: "AchievementIcon",
    });
  },
  16: () => {
    return React.createElement("img", {
      src: Emessage,
      className: "AchievementIcon",
    });
  },
  17: () => {
    return React.createElement("img", {
      src: telegram1,
      className: "AchievementIcon",
    });
  },
  18: () => {
    return React.createElement("img", {
      src: subscribetonewsletter,
      className: "AchievementIcon",
    });
  },
  19: () => {
    return React.createElement("img", {
      src: twitter,
      className: "AchievementIcon",
    });
  },
  20: () => {
    return React.createElement("img", {
      src: bridge3nftspartners,
      className: "AchievementIcon",
    });
  },
  21: () => {
    return React.createElement("img", {
      src: bridge5nftspartners,
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
    link: any = config._DEFAULT_TWITTER_LINK,
    dispatch: Dispatch<AnyAction>,
    achievmentNumber: number,
    setClicked: React.Dispatch<React.SetStateAction<string[]>>
  ) => async () => {
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
    const lin = await link()
    return window.open(lin, '_blank');
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
