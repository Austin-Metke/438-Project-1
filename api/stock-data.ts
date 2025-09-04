import { config } from "./config";

let requestOptions = {
  method: "GET",
};

const getStockHistory = async (
  ticker: string,
  startDate: string,
  endDate: string
) => {
  const dateRegex = /^\d{4}\-\d{2}\-\d{2}$/; // regex for yyyy-mm-dd
  if (!(dateRegex.test(startDate) && dateRegex.test(endDate))) {
    throw new Error("Incorrect date format");
  }

  const startObject: Date = new Date(startDate);
  const endObject: Date = new Date(endDate);

  if (endObject < startObject) {
    throw new Error("End date cannot be earlier than start date");
  }

  const params = new URLSearchParams({
    api_token: config.stockDataApi,
    symbols: ticker,
    date_from: startDate, // Format: YYYY-MM-DD
    date_to: endDate, // Format: YYYY-MM-DD
    sort: "asc", // Show oldest to newest for progression
    interval: "hour"
  });

  return fetch(
    `https://api.stockdata.org/v1/data/intraday?${params}`,
    requestOptions
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error("Network error: Unable to fetch stock data");
      }
      throw error;
    });
};

export { getStockHistory };
