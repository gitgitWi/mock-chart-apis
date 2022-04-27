import nodeFetch from "node-fetch";

const BASE_URL = "http://api.finance.zum.com";

export class Fetcher {
  constructor(
    private readonly baseUrl = BASE_URL,
    private readonly fetch = nodeFetch
  ) {
    //
  }

  async fetchMapData(paths: string) {
    return this.load(paths);
  }

  async fetchStockPrices(paths: string) {
    return this.load(paths);
  }

  private async load(paths: string): Promise<unknown> {
    try {
      return this.fetch(this.getRequestUrl(paths)).then((res) => res.json());
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  private getRequestUrl(paths: string) {
    return this.baseUrl.concat(paths);
  }
}
