import { StyleSheet, Text, View } from "react-native";

export default function StockInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stock Info</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
