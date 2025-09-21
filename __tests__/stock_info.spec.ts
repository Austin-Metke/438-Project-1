import StockInfoScreen from "../app/(stock)/stock_info";

// Mock React Native components
jest.mock("react-native", () => ({
  StyleSheet: {
    create: jest.fn((styles: any) => styles),
  },
  Text: ({ children }: { children: any }) => `Text: ${children}`,
  View: ({ children }: { children: any }) => `View: ${children}`,
  TouchableOpacity: ({ children }: { children: any }) =>
    `TouchableOpacity: ${children}`,
  ScrollView: ({ children }: { children: any }) => `ScrollView: ${children}`,
  ActivityIndicator: ({ size, color }: { size: string; color: string }) =>
    `ActivityIndicator: ${size} ${color}`,
}));

// Mock expo-router
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({})),
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}));

// Mock React hooks
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(() => [null, jest.fn()]),
  useEffect: jest.fn(),
}));

describe("StockInfoScreen", () => {
  it("should render without crashing", () => {
    expect(() => {
      StockInfoScreen();
    }).not.toThrow();
  });

  it("should display stock information title", () => {
    const component = StockInfoScreen();
    const componentString = JSON.stringify(component);

    expect(componentString).toContain("Stock Information");
  });
});
