import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { StockGraph } from "../../api/stockGraph";

interface StockData {
  data?: {
    symbol?: string;
    name?: string;
    price?: number;
    change?: number;
    exchange?: string;
    currency?: string;
  }[];
}

export default function StockInfoScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [stockData, setStockData] = useState<StockData | null>(null); 

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

  const renderStockInfo = () => {
    if (!stockData || !stockData.data || stockData.data.length === 0) {
      return <Text style={styles.noDataText}>No stock data available</Text>;

    }

    const stock = stockData.data[0];

    return (
      <View style={styles.stockCard}>
        <Text style={styles.stockSymbol}>{stock.symbol}</Text>

        {}
        {stock.data && (
          <Text style={styles.stockPrice}>Open: ${stock.open}</Text>
        )}

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
          <Text style={styles.detailLabel}>Low:</Text>
          <Text style={styles.detailValue}>{stock.data.low || "N/A"}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>High:</Text>
          <Text style={styles.detailValue}>{stock.data.high || "USD"}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>Stock Data & Graph</Text>  

      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="trade!"
          buttonStyle={styles.longButton}
          titleStyle={styles.buttonText}
          onPress={() =>
            router.push({
              pathname: "../components/buySell",   // or wherever your file lives
              params: { symbol: params.symbol as string },
            })
          }
        />
      </View>


      <View style={styles.content}>
        {renderStockInfo()}
        {params.symbol && (
          <StockGraph symbol={params.symbol as string} data={stockData?.data} />
        )}

        {}
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
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  
  longButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    height: 60,          
    width: "100%",    
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
