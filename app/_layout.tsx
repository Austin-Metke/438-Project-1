import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./(auth)/login";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    // <Stack>
    //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //   <Stack.Screen
    //     name="(stock)"
    //     options={{
    //       headerShown: false, // This will hide the "(stock)" header
    //     }}
    //   />
    // </Stack>
  );
}