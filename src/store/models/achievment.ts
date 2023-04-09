
import { IACHIEVMENT, IPROJECT } from "store/types"
import { IUserAchievments } from "./user";
import { actionTypesImages, actionTypesImagesType } from "components/lists/achievments/consts";
import { AchivType } from "store/types";
import { config } from '../../index'
import { Api } from "services/api";


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
        const setKey = Object.keys(actionTypesImages).find((key) =>
            this.data.description.includes(key)) || "Invite";

        return actionTypesImages[setKey as keyof actionTypesImagesType];
    }


    getSrc(userProgress: IUserAchievments | undefined, idx: number, imageSet: string[]) {
        return userProgress
            ? idx < userProgress.progressNumber
                ? imageSet[1]
                : imageSet[0]
            : imageSet[1]
    }


    getCurrentProgress(userProgress: IUserAchievments | undefined) {
        return userProgress
            ? userProgress.progressNumber > this.data.progressBarLength
                ? this.data.progressBarLength
                : userProgress.progressNumber
            : 0
    }

    async getLink(achievmentNumber: number, api?:Api) {
        let url: string | undefined;
        switch (this.data.name) {
            case AchivType.Telegram: {
                break;
            }

            case AchivType.Twitter: {
                url = 'https://twitter.com/';
                if (/follow/i.test(this.data.description)) {
                    url += (/xp\.network/i.test(this.data.description)) ? `intent/user?user_id=1376812227316088832` : `intent/user?user_id=${this.project?.twitterPartnerId}`

                } else {
                    let lastTweet;
                    if (achievmentNumber === 15) {
                        lastTweet = await api?.getAchievmentNumber(achievmentNumber);
                    } else {
                        lastTweet = await api?.getLastTweet()
                    }
                 
                    url += `intent/retweet?tweet_id=${lastTweet?.data}`
                }
                break;
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
export type { Achievment }