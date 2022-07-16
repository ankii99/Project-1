import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Checkbox from "./Checkbox";

export default function Productbrands({ text, OnCheckPress, show }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={OnCheckPress}
    >
      <View style={styles.checkView}>
        <Checkbox show={show} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text1}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "90%",
    borderRadius: 25,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#E7F8F8",
    marginBottom: 4,
    marginTop: 2,
    flexDirection: "row",
  },
  checkView: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  textView: {
    width: "85%",
    height: "100%",
    justifyContent: "center",
  },
  text1: {
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "400",
  },
});
