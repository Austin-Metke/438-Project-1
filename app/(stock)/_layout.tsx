import { Stack } from "expo-router";

export default function StockLayout() {
  return (
    <Stack initialRouteName="stock_info">
      <Stack.Screen
        name="stock_info"
        options={{
          title: "Stock Information", // Add this to override the default "(stock)" title
        }}
      />
    </Stack>
  );
}
