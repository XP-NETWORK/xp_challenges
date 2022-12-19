import axios from "axios";
import { TelegramUser } from "store/types";

class Api {
  base = "";

  constructor(base: string) {
    this.base = base;
  }

  async getData() {
    return await axios.get(this.base + "/getAllAchievments");
  }

  async verifyTelegramData(data: TelegramUser) {
    try {
      return await axios.post(this.base + "/verifyTelegramAccount", data);
    } catch (e) {
      console.log(e, "e1");
      return undefined;
    }
  }
}

export default (base: string) => new Api(base);
export type { Api };
