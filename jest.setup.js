// Mock React Native components
jest.mock("react-native", () => ({
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  Text: "Text",
  View: "View",
  TouchableOpacity: "TouchableOpacity",
  ScrollView: "ScrollView",
}));
