import { getStockHistory, searchForTick } from "@/api/stockData";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

export default function Index() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState(null);
  const router = useRouter();

  // Update search value each time it is updated
  const updateSearch = (searchText: string) => {
    setSearch(searchText);
    setError(""); // Clear error when user types
    setStockData(null); // Clear previous stock data
  };

  const handleSearchSubmit = async () => {
    if (!search.trim()) {
      setError("Please enter a stock symbol");
      return;
    }

    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    setStockData(null); // Clear previous stock data

    try {
      const result = await getStockHistory(search.toLowerCase());

      if (result && result.data && result.data.length > 0) {
        // Stock found - display the data
        router.push({
          pathname: "/(stock)/stock_info",
          params: {
            stockData: JSON.stringify(result),
            symbol: search.toUpperCase(),
          },
        });
        setError("");
      } else {
        // Stock not found - show error instead of navigating
        setError(`Stock symbol "${search.toUpperCase()}" not found`);
        setStockData(null);
      }
    } catch (error) {
      console.log("Stock search error:", error);
      // Show error instead of navigating
      setError("Error searching for stock. Please try again.");
      setStockData(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stock Search</Text>
      <SearchBar
        placeholder="Enter stock symbol (e.g., AAPL)"
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
        disabled={loading} // Disable search during loading
      />

      {/* Display loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Searching for {search}...</Text>
        </View>
      )}

      {/* Display error message if exists */}
      {error && !loading ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "flex-start", // Changed from center to flex-start
    padding: 20,
    paddingTop: 60, // Add top padding
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  searchContainer: {
    backgroundColor: "#25292e",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingHorizontal: 0,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "#007AFF",
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#ff6b6b",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  stockDataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#2D3748",
    borderRadius: 8,
    width: "100%",
    maxHeight: 300,
  },
  stockDataTitle: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stockDataText: {
    color: "#A0AEC0",
    fontSize: 12,
    fontFamily: "monospace",
  },
  popularSection: {
    marginTop: 40,
    alignItems: "center",
  },
  popularTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  popularStocks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  stockButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 5,
  },
  stockButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
