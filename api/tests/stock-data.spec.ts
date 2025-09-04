import { getStockHistory } from "../stock-data";

// Mock fetch globally
global.fetch = jest.fn();

describe("getStockHistory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Date validation", () => {
    it("should throw error when end date is earlier than start date", async () => {
      await expect(
        getStockHistory("AAPL", "2024-01-10", "2024-01-05")
      ).rejects.toThrow("End date cannot be earlier than start date");
    });

    it("should accept valid date range", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: [] }),
      });

      await expect(
        getStockHistory("AAPL", "2024-01-01", "2024-01-10")
      ).resolves.not.toThrow();
    });

    it("should only accept yyyy-mm-dd format", async () => {
      await expect(
        getStockHistory("AAPL", "2024/10/10", "2024/11/20")
      ).rejects.toThrow("Incorrect date format");
    });
  });

  describe("API calls", () => {
    it("should call the correct endpoint with proper parameters", async () => {
      const mockResponse = { data: [{ ticker: "AAPL" }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await getStockHistory("AAPL", "2024-01-01", "2024-01-10");

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("https://api.stockdata.org/v1/data/intraday"),
        { method: "GET" }
      );
    });

    it("should return API response data", async () => {
      const mockResponse = { data: [{ ticker: "AAPL", price: 150 }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getStockHistory("AAPL", "2024-01-01", "2024-01-10");
      expect(result).toEqual(mockResponse);
    });
  });

  describe("Error handling", () => {
    it("should handle network errors", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(
        getStockHistory("AAPL", "2024-01-01", "2024-01-10")
      ).rejects.toThrow("Network error");
    });
  });
});
