import { getStockPrices, getTopStocks } from "./src/services/index.mjs";
import { DEFAULT_TIMESTAMPS } from "./src/constants/index.mjs";

/**
 * @param {import("./types").HandlerEvent} param0
 */
export const handler = async ({ rawPath, queryStringParameters }) => {
  /**
   * @example /prices/domestic/005930?period=day
   * @type {[string, import("types.js").Market, string]}
   */
  // @ts-ignore
  const [_ = "", type = "", market = "", code = ""] = rawPath.split("/");

  /** @todo url parser, error 처리 로직 분리 */
  if (!type) {
    return {
      message: "Type must be exists!",
    };
  }

  if (type === "prices") {
    if (!(market && code))
      return {
        message: "Market/Code must be exists!",
      };

    const {
      period,
      start = DEFAULT_TIMESTAMPS.start,
      end = DEFAULT_TIMESTAMPS.end,
    } = queryStringParameters;

    if (!period)
      return {
        message: "Period must be exists!",
      };

    const results = getStockPrices(code, market, period, { start, end });
    return {
      results,
      message: results ? "success" : "failed",
    };
  }

  if (type === "stocks") {
    if (!market)
      return {
        message: "Market/Code must be exists!",
      };

    const results = getTopStocks(market);
    return {
      results,
      message: results ? "success" : "failed",
    };
  }

  return { message: "Not Implemented Type" };
};
