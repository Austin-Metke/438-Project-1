import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./(auth)/login";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // <View style={styles.container}>
    //   <Login/>
    //   <StatusBar style="auto" />
    // </View>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});

// // app/login.tsx
// import { Text, View } from "react-native";

// export default function Login() {
//   return (
//     <View style={{ padding: 24 }}>
//       <Text>Login screen</Text>
//     </View>
//   );
// }
