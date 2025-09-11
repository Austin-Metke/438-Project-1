// stockPrice.ts
// to use while in api folder of this project:  npx ts-node stockPrice.ts "stock ticker"
// in this file you input a ticker (AAPL, AMZN) and it spits out a json format with the prices
// there's an issue where I cant get TODAYS stock price, i used a curl to get prices from 09/02/25 to 09/09/25 but the 
// to use while in api folder of this project:  npx ts-node stockPrice.ts "stock ticker"
// Senen Bagos, 9/11/25

import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "..", ".env") });

type QuoteItem = {
  ticker: string;
  name: string;
  currency: string;
  price: number;
  day_open?: number;
  day_high?: number;
  day_low?: number;
  last_trade_time: Date;
};

type QuoteResponse = {
  data?: QuoteItem[];
};

const API_BASE = "https://api.stockdata.org/v1/data/quote";
const API_TOKEN = process.env.EXPO_PUBLIC_STOCKDATA_API;

if (!API_TOKEN) {
  throw new Error(
    "Missing STOCKDATA_API_TOKEN. Set it in your .env at project root."
  );
}

export async function getCurrentPrice(
  symbol: string, //symbol is ticker input like AAPL
  opts: { extendedHours?: boolean } = {}
): Promise<QuoteItem> {
  const params = new URLSearchParams({
    symbols: symbol.toUpperCase(),
    api_token: API_TOKEN as string,
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

  if (typeof (quote as any).price !== "number") {
    throw new Error(`Quote did not include a numeric price for ${symbol}`);
  }

  return quote;
}

// --- CLI entry point ---
if (process.argv[1] && process.argv[1].endsWith("stockPrice.ts")) {
  (async () => {
    const symbol = process.argv[2];
    if (!symbol) {
      console.error("Usage: ts-node stockPrice.ts <TICKER>");
      process.exit(1);
    }

    try {
      const q = await getCurrentPrice(symbol);
      console.log(JSON.stringify(q, null, 2));
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Unknown error");
      process.exit(1);
    }
  })();
}
