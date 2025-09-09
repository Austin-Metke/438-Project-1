// stockPrice.ts
// to use while in api folder of this project:  npx ts-node stockPrice.ts "stock ticker"

type QuoteItem = {
  ticker: string;
  name: string;
  currency: string;
  price: number;
  day_open?: number;
  day_high?: number;
  day_low?: number;
  last_trade_time: Date
};

type QuoteResponse = {
  data?: QuoteItem[];
};

const API_BASE = "https://api.stockdata.org/v1/data/quote";
const API_TOKEN = "A8S7IpasQpaWT9X5VzHl8q309gk6ss8KwhxPh6fN";

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
      const dateStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      console.log(JSON.stringify(q, null, 2));
      
      const tradeDate = new Date(q.last_trade_time).toISOString().split("T")[0];
      const today = new Date().toISOString().split("T")[0];

      if (tradeDate !== today) {
        console.log(`⚠️ Latest trade is from ${tradeDate}, not today`);
      } else {
        console.log(`✅ This is today's trade price: $${q.price}`);
      }
      
      // console.log(
      //   `${q.ticker} (${q.name}) — $${q.price} ${currency}` +
      //     (q.day_open != null
      //       ? ` | O:${q.day_open} H:${q.day_high} L:${q.day_low}`
      //       : "") +
      //     ` | ${dateStr}`
      // );
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Unknown error");
      process.exit(1);
    }
  })();
}
