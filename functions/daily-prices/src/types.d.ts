export type Market = "domestic" | "overseas";

export type PricesPeriod = "day" | "week" | "month" | "quarter" | "year";

export type PricesTimeSpans = {
  start?: `${number}`;
  end?: `${number}`;
};

export interface HandlerEvent {
  rawPath: string;
  queryStringParameters: {
    period?: PricesPeriod;
  } & PricesTimeSpans;
}
