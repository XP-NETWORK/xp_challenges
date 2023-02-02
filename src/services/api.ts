import axios from "axios";
import { ILeader, TelegramUser } from "store/types";
import { User, UserData } from "../store/models/user";
import { axiosInstance } from "./axios";

class Api {
  base = "";

  constructor(base: string) {
    this.base = base;
  }

  async getData() {
    const [achievements, project] = await Promise.all([
      (await axiosInstance(this.base).get("/getAllAchievments")).data,
      (await axiosInstance(this.base).get("/getCurrentProject")).data,
    ])
    return {
      achievements,
      project
    }
  }

  async getUser(name: string) {
    try {
      return await axiosInstance(this.base).get(
        `/getByTelegramUsername?telegramUsername=${encodeURIComponent(name)}`
      );
    } catch (e) {
      console.log(e, "in getUser");
      return undefined;
    }
  }

  async verifyTelegramData(data: TelegramUser) {
    try {
      return await axiosInstance(this.base).post("/verifyTelegramAccount", data);
    } catch (e) {
      console.log(e, "in verifyTelegramData");
      return undefined;
    }
  }

  async signup(user: User) {
    try {
      return await axiosInstance(this.base).post("/addUser", user.data);
    } catch (e) {
      console.log(e, "e in user");
      return undefined;
    }
  }

  async updateTwitterAccount(user: User) {
    try {
      return await axiosInstance(this.base).patch(`/addTwitterAccount?telegramUsername=${user.data.telegramUsername}&twitterUserName=${user.data.twitterUserName}&twitterAcountId=${user.data.twitterAcountId}`);
    } catch (e: any) {
      console.log(e, 'in updateUser');
    }
  }

  async updateWallet(user: User, wallet: {
    chain: string; address: string
  }) {
    try {
      return await axios.patch(this.base + `/addWallet?telegramUsername=${user.data.telegramUsername}&address=${wallet?.address}&chain=${wallet?.chain}`);
    } catch (e) {
      console.log(e, 'in updateWallet')
    }
  }

  async getBoard() {
    try {
      return await (await axios.get(this.base + `/getLeaderboard?projectNumber=1`)).data as ILeader[]
    } catch (e) {
      console.log(e, ' in getBoard');
      return undefined
    }
  }

  async getUsersDeregisteredId(uniqueId: string) {
    try {
      return await (await axios.get(this.base + `/getUsersByregisteredId?registeredId=${uniqueId}`)).data as ILeader[]
    } catch (e) {
      console.error(e)
    }
  }

  async sendEmail(email: string, userData: UserData, projectNumber: number) {
    try {
      return await (await axios.post(this.base + `/sendEmail`, {
        emailAddress: email,
        telegramUsername: userData.telegramUsername,
        projectNumber
      })).data
    } catch (e) {
      console.log(e, ' in getBoard');
      return undefined
    }
  }
}

export default (base: string) => new Api(base);
export type { Api };
