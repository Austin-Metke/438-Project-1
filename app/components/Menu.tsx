import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDown from "./DropDown";

const Menu: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Buy", "Sell"];

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
    setShowDropDown(false);
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.button, showDropDown && styles.activeButton]}
        onPress={toggleDropDown}
      >
        <Text style={styles.buttonText}>
          {selectedOption ? `Selected: ${selectedOption}` : "Select..."}
        </Text>
      </TouchableOpacity>

      {showDropDown && (
        <DropDown options={options} optionSelected={handleOptionSelected} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  announcement: {
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Menu;
