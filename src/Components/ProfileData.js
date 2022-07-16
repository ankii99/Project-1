import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileData({ text, source, onPress }) {
  return (
    <TouchableOpacity style={styles.data1} onPress={onPress}>
      <View style={styles.data1Image}>
        <Image source={source} style={styles.image1} />
      </View>
      <View style={styles.data1Text}>
        <Text style={styles.text1}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  data1: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    marginTop:5,
  },
  data1Image: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  image1: {
    height: 20,
    width: 20,
  },
  data1Text: {
    height: "100%",
    width: "80%",
    justifyContent: "center",
    // alignItems: "center",
  },
  text1: {
    fontFamily: "Helvetica",
    fontSize: 21,
    fontWeight: "400",
    color: "#fff",
  },
});
