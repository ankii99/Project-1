import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Appheader({
  text,
  source,
  style = styles.image1,
  mar,
  onPress
}) {
  return (
    <View style={styles.TextContainer1}>
      <TouchableOpacity style={styles.image} onPress={onPress}>
        <Image style={style} source={source} />
      </TouchableOpacity>
      <View style={[styles.view]}>
        <Text style={[styles.text1]}>{text}</Text>
      </View>
      {/*  */}
    </View>
  );
}

const styles = StyleSheet.create({
  TextContainer1: {
    width: "100%",
    flexDirection: "row",
    // backgroundColor:"blue"
  },
  image: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  image1: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    tintColor: "#FFF",
  },
  view: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
    // backgroundColor:"blue"
  },
  text1: {
    fontWeight: "700",
    fontFamily: "Helvetica",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginRight: 30,
  },
});
