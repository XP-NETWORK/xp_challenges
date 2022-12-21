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
}

export default (base: string) => new Api(base);
export type { Api };
