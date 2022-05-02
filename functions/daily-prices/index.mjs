import { getStockPrices } from "./src/services/index.mjs";
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

  if (!(type && market && code))
    return {
      message: "Type/Market/Code must be exists!",
      request: {
        rawPath,
        queryStringParameters,
      },
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

  if (type === "prices") {
    const results = getStockPrices(code, market, period, { start, end });
    return {
      results,
      message: results ? "success" : "failed",
    };
  }

  if (type === "stocks") {
    return {
      //
    };
  }

  return { message: "Not Implemented Type" };
};
