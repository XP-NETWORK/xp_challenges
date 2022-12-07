import { ICard, IAbility, IMechanic } from "../store/types";


class Api {
  base = "";

  constructor(base: string) {
    this.base = base;
  }

  async getCards() {
    try {
      return (await (
        await fetch(this.base + "/cards", {
          headers: {
            Accept: "*",
            "Content-Type": "application/json",
          },
        })
      ).json()) as {
        cards: ICard[];
        abilities: IAbility[];
        mechanics: IMechanic[];
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export default (base: string) => new Api(base);
export type { Api };
