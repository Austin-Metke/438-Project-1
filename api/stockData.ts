import { config } from "./config";
import { useState, useEffect } from "react";

let requestOptions = {
  method: "GET",
};

export const getStockHistory = async (
  ticker: string,
  startDate: string,
  endDate: string,
  interval: string = "minute"
) => {
  interval = interval.toLowerCase();
  ticker = ticker.toUpperCase();

  const dateRegex = /^\d{4}\-\d{2}\-\d{2}$/; // regex for yyyy-mm-dd
  if (!(dateRegex.test(startDate) && dateRegex.test(endDate))) {
    throw new Error("Incorrect date format");
  }

  const startObject: Date = new Date(startDate);
  const endObject: Date = new Date(endDate);

  if (endObject < startObject) {
    throw new Error("End date cannot be earlier than start date");
  }

  if (!["hour", "minute"].includes(interval)) {
    throw new Error("Invalid interval type. Must be 'hour' or 'minute'");
  }

  const params = new URLSearchParams({
    api_token: config.stockDataApi,
    symbols: ticker,
    date_from: startDate, // Format: YYYY-MM-DD
    date_to: endDate, // Format: YYYY-MM-DD
    sort: "asc", // Show oldest to newest for progression
    interval: interval,
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

// Fixed searchForTick function
export const searchForTick = async (ticker: string) => {
  const params = new URLSearchParams({
    api_token: config.stockDataApi,
    symbols: ticker,
  });

  try {
    const response = await fetch(
      `https://api.stockdata.org/v1/entity/search?${params}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Check if any results were found
    if (result.data && result.data.length > 0) {
      return result; // Stock found
    } else {
      return null; // Stock not found
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: Unable to search for stock");
    }
    throw error;
  }
};
