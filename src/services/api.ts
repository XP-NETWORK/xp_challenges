import axios from "axios";
import { TelegramUser } from "store/types";
import { User } from "../store/models/user";

class Api {
  base = "";

  constructor(base: string) {
    this.base = base;
  }

  async getData() {
    return await axios.get(this.base + "/getAllAchievments");
  }

  async getUser(name: string) {
    try {
      return await axios.get(
        this.base +
        `/getByTelegramUsername?telegramUsername=${encodeURIComponent(name)}`
      );
    } catch (e) {
      console.log(e, "in getUser");
      return undefined;
    }
  }

  async verifyTelegramData(data: TelegramUser) {
    try {
      return await axios.post(this.base + "/verifyTelegramAccount", data);
    } catch (e) {
      console.log(e, "in verifyTelegramData");
      return undefined;
    }
  }

  async signup(user: User) {
    try {
      return await axios.post(this.base + "/addUser", user.data);
    } catch (e) {
      console.log(e, "e in user");
      return undefined;
    }
  }

  async updateUser(user: User) {
    try {
      return await axios.patch(this.base + "/updateUser", user.data);
    } catch (e: any) {
      console.log(e, 'in updateUser');
    }
  }

  async updateWallet(user: User, wallet: {
    chain: string; address: string
  }) {
    try {
      return await axios.patch(this.base + `/updateUser?user=${user.data.telegramUsername}&wallet=${wallet.address}&chain=${wallet.chain}`);
    } catch (e) {
      console.log(e, 'in updateWallet')
    }
  }
}

export default (base: string) => new Api(base);
export type { Api };
