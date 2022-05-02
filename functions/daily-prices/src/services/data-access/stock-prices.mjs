import { SQLiteClient } from "../db-clients/index.mjs";

const sqlite = new SQLiteClient("./test.sqlite");
sqlite.setTargetTable("test");

/**
 * @param {string} stockCode
 * @param {import("../../types").Market} market
 * @param {import("../../types").PricesPeriod} period
 * @param {import("../../types").PricesTimeSpans} param3
 * @returns {any[]}
 */
export const getStockPrices = (stockCode, market, period, { start, end }) => {
  const id = `prices-${market}-${stockCode}-${period}-${start}-${end}`;
  const result = sqlite.read(id);
  return result ? JSON.parse(result.value) : [];
};
