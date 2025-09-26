import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getStockHistory } from "./stockData";

// Get screen dimensions
const screenWidth = Dimensions.get("window").width;

interface StockGraphProps {
  symbol: string;
  data?: any[];
}

export const StockGraph: React.FC<StockGraphProps> = ({ symbol, data }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStockData = async () => {
      try {
        setLoading(true);
        let stockData = data;

        // If no data provided, fetch it
        if (!stockData) {
          const result = await getStockHistory(symbol);
          stockData = result.data;
        }

        if (stockData && stockData.length > 0) {
          // Process data for chart
          const processedData = processStockData(stockData);
          setChartData(processedData);
        } else {
          setError("No stock data available");
        }
      } catch (err) {
        setError("Failed to load stock data");
        console.error("Stock graph error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      loadStockData();
    }
  }, [symbol, data]);

  const processStockData = (stockData: any[]) => {
    // Take last 10 data points to avoid overcrowding
    const recentData = stockData.slice(-10);

    const labels = recentData.map((item, index) => {
      if (item.date) {
        // Format date to show month/day
        const date = new Date(item.date);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      }
      return `Day ${index + 1}`;
    });

    const prices = recentData.map((item) =>
      parseFloat(item.data.close || item.data.price || item.data.value || 0)
    );

    return {
      labels,
      datasets: [
        {
          data: prices,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green line
          strokeWidth: 2,
        },
      ],
    };
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading chart...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!chartData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No chart data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{symbol} Stock Price</Text>

      <LineChart
        data={chartData}
        width={screenWidth - 40} // Chart width
        height={220} // Chart height
        chartConfig={{
          backgroundColor: "#2D3748",
          backgroundGradientFrom: "#2D3748",
          backgroundGradientTo: "#1A202C",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#4CAF50",
          },
        }}
        bezier // Makes the line curved
        style={styles.chart}
      />

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Chart Statistics</Text>
        <Text style={styles.statsText}>
          Data points: {chartData.datasets[0].data.length}
        </Text>
        <Text style={styles.statsText}>
          Price range: ${Math.min(...chartData.datasets[0].data).toFixed(2)} - $
          {Math.max(...chartData.datasets[0].data).toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  errorText: {
    color: "#F44336",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  statsContainer: {
    backgroundColor: "#2D3748",
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  statsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsText: {
    color: "#A0AEC0",
    fontSize: 14,
    marginBottom: 5,
  },
});
