import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getStockHistory } from "../../api/stockData";
import { getToken } from "../../api/tokenStorage";
import Menu from "../components/Menu";

export default function BuySell() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  console.log(symbol + "** ")
  const [price, setPrice] = useState<number | null>(null);
  console.log("Symbol from URL:", symbol); //ok so we are actually get this ok

  useEffect(() => {
    const getPrice = async () => {
      if (!symbol || typeof symbol !== "string") {
        console.warn("No name provided.");
        return;
      }

      const token = await getToken();
      if (!token) {
        console.error("No API token found");
        return;
      }

      try {
        const end = new Date();                     // now
        const start = new Date(end.getTime() - 24 * 60 * 60 * 1000); // 24h ago
        const result = await getStockHistory(symbol, start, end, "minute");
        console.log("API result:", JSON.stringify(result, null, 2));

        if (result?.data?.length > 0) {
          const lastPrice = result.data[result.data.length - 1].close;
          setPrice(lastPrice);
        } else {
          console.warn("No data returned for symbol:", symbol);
        }
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    getPrice();
  }, [symbol]);

  function updateDatabase(event: GestureResponderEvent): void {
    console.log("User clicked login or submit.");
    // still need to update
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ticker: {symbol ?? "Unknown"}</Text>
      <View style={styles.dropdownContainer}>
        <Menu />
      </View>

      <Text style={styles.instructionText}>
        Enter number of shares to affect
      </Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="e.g. 10"
        placeholderTextColor="#A0AEC0"
      />

      <TouchableOpacity style={styles.confirmButton} onPress={updateDatabase}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#ffd33d",
    marginBottom: 20,
  },
  dropdownContainer: {
    backgroundColor: "#2D3748",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    color: "#A0AEC0",
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: "#4A5568",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#1A202C",
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#3182CE",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
