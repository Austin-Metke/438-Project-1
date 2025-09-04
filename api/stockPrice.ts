// import { Double } from "react-native/Libraries/Types/CodegenTypes";
// import { config } from "./config";

// console.log("hello world");

// let requestOptions = {
//   method: "GET",
// };

// const getPriceOfDay = async (
//     ticker: string, 
//     date: string, 
//     price: Double
// ) => {
//     ticker = ticker.toUpperCase();

//     const params = new URLSearchParams({
//     api_token: config.stockDataApi,
//     symbols: ticker,
//     todaysdate: date
//   });
// }

// stockPrice.ts
// Usage:  npx ts-node stockPrice.ts AAPL

type QuoteItem = {
  ticker: string;
  name: string;
  currency: string;
  price: number;
  day_open?: number;
  day_high?: number;
  day_low?: number;
  date: string;
};

type QuoteResponse = {
  data?: QuoteItem[];
};

const API_BASE = "https://api.stockdata.org/v1/data/quote";
const API_TOKEN = "API KEY HERE";

export async function getCurrentPrice(
  symbol: string,
  opts: { extendedHours?: boolean } = {}
): Promise<QuoteItem> {
  const params = new URLSearchParams({
    symbols: symbol.toUpperCase(),
    api_token: API_TOKEN,
  });

  if (opts.extendedHours) {
    params.set("extended_hours", "true");
  }

  const url = `${API_BASE}?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} fetching quote: ${res.statusText} ${text}`
    );
  }

  const json = (await res.json()) as QuoteResponse;

  if (!json.data || json.data.length === 0) {
    throw new Error(`No quote data returned for symbol: ${symbol}`);
  }

  const quote = json.data[0];

  if (typeof quote.price !== "number") {
    throw new Error(`Quote did not include a numeric price for ${symbol}`);
  }

  return quote;
}

// --- CLI entry point in ESM world ---
if (process.argv[1] && process.argv[1].endsWith("stockPrice.ts")) {
  (async () => {
    const symbol = process.argv[2];
    if (!symbol) {
      console.error("Usage: ts-node stockPrice.ts <TICKER>");
      process.exit(1);
    }

    try {
      const q = await getCurrentPrice(symbol);
      const currency = q.currency || "USD";
      console.log(
        `${q.ticker} (${q.name}) — $${q.price} ${currency}` +
          (q.day_open != null
            ? ` | O:${q.day_open} H:${q.day_high} L:${q.day_low}`
            : "")
      );
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Unknown error");
      process.exit(1);
    }
  })();
}
