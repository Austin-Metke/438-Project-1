import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface StockData {
  data?: Array<{
    symbol?: string;
    name?: string;
    price?: number;
    change?: number;
    exchange?: string;
    currency?: string;
  }>;
}

export default function StockInfoScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [stockData, setStockData] = useState<StockData | null>(null); // Add proper typing

  useEffect(() => {
    if (params.stockData) {
      try {
        const parsedData = JSON.parse(params.stockData as string);
        setStockData(parsedData);
      } catch (error) {
        console.error("Error parsing stock data:", error);
      }
    }
  }, [params.stockData]);

  const generateGraph = () => {
    if (!stockData || !stockData.data || stockData.data.length === 0) {
      return <Text style={styles.noDataText}>No stock data available</Text>;
    }
  };

  const renderStockInfo = () => {
    if (!stockData || !stockData.data || stockData.data.length === 0) {
      return <Text style={styles.noDataText}>No stock data available</Text>;
    }

    const stock = stockData.data[0];
    // Get first stock result

    return (
      <View style={styles.stockCard}>
        <Text style={styles.stockSymbol}>{stock.symbol}</Text>
        <Text style={styles.stockName}>{stock.name || "Company Name"}</Text>

        {/* Adds stock information onto the screen */}
        {stock.price && <Text style={styles.stockPrice}>${stock.price}</Text>}

        {stock.change && (
          <Text
            style={[
              styles.stockChange,
              { color: stock.change >= 0 ? "#4CAF50" : "#F44336" },
            ]}
          >
            {stock.change >= 0 ? "+" : ""}
            {stock.change}
          </Text>
        )}

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Exchange:</Text>
          <Text style={styles.detailValue}>{stock.exchange || "N/A"}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Currency:</Text>
          <Text style={styles.detailValue}>{stock.currency || "USD"}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{params.symbol}</Text>
      </View>

      <View style={styles.content}>
        {renderStockInfo()}

        {/* Debug section - remove in production
        <View style={styles.debugSection}>
          <Text style={styles.debugTitle}>Raw Data (Debug):</Text>
          <Text style={styles.debugText}>
            {stockData ? JSON.stringify(stockData, null, 2) : "No data"}
          </Text>
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  backText: {
    color: "#007AFF",
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  symbol: {
    color: "#007AFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  stockCard: {
    backgroundColor: "#2D3748",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  stockSymbol: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  stockName: {
    color: "#A0AEC0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  stockPrice: {
    color: "#4CAF50",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  stockChange: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    color: "#A0AEC0",
    fontSize: 16,
  },
  detailValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noDataText: {
    color: "#A0AEC0",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  debugSection: {
    marginTop: 30,
    backgroundColor: "#1A202C",
    borderRadius: 8,
    padding: 15,
  },
  debugTitle: {
    color: "#FED7E2",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  debugText: {
    color: "#E2E8F0",
    fontSize: 10,
    fontFamily: "monospace",
  },
});
