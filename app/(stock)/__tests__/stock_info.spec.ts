import React from "react";

// Mock React Native components
jest.mock("react-native", () => ({
  StyleSheet: {
    create: jest.fn((styles: any) => styles),
  },
  Text: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  TouchableOpacity: ({ children }: { children: React.ReactNode }) => children,
  ScrollView: ({ children }: { children: React.ReactNode }) => children,
  ActivityIndicator: () => "ActivityIndicator",
}));

// Mock expo-router
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({
    symbol: "AAPL",
    stockData: JSON.stringify({
      data: [{ symbol: "AAPL", name: "Apple Inc." }],
    }),
  })),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

// Import after mocking
const StockInfoScreen = require("../stock_info").default;

describe("StockInfoScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    expect(() => {
      StockInfoScreen();
    }).not.toThrow();
  });

  it("should be defined as a function", () => {
    expect(typeof StockInfoScreen).toBe("function");
  });
});
