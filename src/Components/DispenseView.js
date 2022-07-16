import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DispenseView({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.textView} onPress={onPress}>
      <Text style={styles.text1}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  textView: {
    height: 45,
    width: "90%",
    borderRadius: 25,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#E7F8F8",
    marginBottom: 5,
  },
  text1: {
    marginLeft: 20,
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "400",
  },
});
