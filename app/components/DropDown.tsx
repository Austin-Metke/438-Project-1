import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DropDownProps = {
  options: string[];
  optionSelected: (option: string) => void;
};

const DropDown: React.FC<DropDownProps> = ({ options, optionSelected }) => {
  return (
    <View style={styles.dropdown}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => optionSelected(option)}
          style={styles.item}
        >
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  item: {
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default DropDown;
