import { getCurrentPrice } from "./stockPrice";

(async () => {
  try {
    const price = await getCurrentPrice("AAPL");
    console.log("Apple stock data:", price);
  } catch (err) {
    console.error("Error fetching stock:", err);
  }
})();