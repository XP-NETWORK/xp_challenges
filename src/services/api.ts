class Api {
  base = "";

  constructor(base: string) {
    this.base = base;
  }

  async getData() {
    return [];
  }
}

export default (base: string) => new Api(base);
export type { Api };
