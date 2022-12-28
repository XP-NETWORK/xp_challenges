
import { IACHIEVMENT, IPROJECT } from "store/types"
import { IUserAchievments } from "./user";

import { actionTypesImages, actionTypesImagesType } from "components/lists/achievments/consts";

import { AchivType } from "store/types";
import {config} from '../../index'


class Achievment {
    data: IACHIEVMENT;
    project: IPROJECT

    constructor(data: IACHIEVMENT, project: IPROJECT) {
        this.data = data
        this.project = project
    }


    getUserProgress(userAchievements: IUserAchievments[] | undefined) {
        return userAchievements?.find(
            (a) => a.achievmentNumber === this.data.achievmentNumber
          );
    }


    getImageSet() {
        const setKey =  Object.keys(actionTypesImages).find((key) =>
                                this.data.description.includes(key)) || "Invite";

       return actionTypesImages[setKey as keyof actionTypesImagesType];
    }


    getSrc(userProgress: IUserAchievments | undefined, idx:number, imageSet:string[]) {
        return userProgress
        ? idx < userProgress.progressNumber
          ? imageSet[1]
          : imageSet[0]
        : imageSet[1]
    }


    getCurrentProgress(userProgress: IUserAchievments | undefined) {
        return  userProgress
        ? userProgress.progressNumber > this.data.progressBarLength
          ? this.data.progressBarLength
          : userProgress.progressNumber
        : 0
    }

    getLink() {
        let url:string | undefined;
        switch (this.data.name) {
            case AchivType.Telegram: {
                break;
            }

            case AchivType.Twitter: {
                url = '';

                console.log(this.data.description);

                switch(this.data.description){
                    case "Follow XP.NETWORK twitter acount":
                      return  url = "https://xp-challenges.herokuapp.com/followXp";
                      case "Follow Drifter twitter acount":
                        return url = "https://xp-challenges.herokuapp.com/followPartner";
                    case "Retweet the latest post form Project page":
                        return url = "https://xp-challenges.herokuapp.com/retweetPost";
                    default:
                        return url = ""
                }
            }

            case AchivType.Bridge: {
                url = config._DEFAULT_BRIDGE_LINK + `&projectNumber=${this.project?.projectNumber}`
                break;
            }


        }

        return url
    }
}

export default (data: IACHIEVMENT, project: IPROJECT) => new Achievment(data, project)
export type {Achievment}