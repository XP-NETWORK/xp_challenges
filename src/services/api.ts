import axios from "axios";

class Api {
  base = "";

  constructor(base: string) {
    this.base = base;
  }

  async getData() {
    return await axios.get(this.base + "/getAllAchievments");
  }
}

export default (base: string) => new Api(base);
export type { Api };
