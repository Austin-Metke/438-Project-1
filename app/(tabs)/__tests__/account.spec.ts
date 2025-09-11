import React from "react";
import AccountScreen from "../account";

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
}));

describe("AccountScreen", () => {
  it("should render without crashing", () => {
    expect(() => {
      AccountScreen();
    }).not.toThrow();
  });

  it("should contain user information", () => {
    const component = AccountScreen();
    const componentString = JSON.stringify(component);

    expect(componentString).toContain("Admin");
    expect(componentString).toContain("admin@google.com");
  });
});
