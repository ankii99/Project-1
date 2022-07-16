import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Path } from "../Config/Path";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Checkbox({onPress,show}) {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      {show ? <Image source={Path.tick} style={styles.imageView} /> : null}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius:2,
    borderColor: "#052120",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"red"
  },
  imageView: {
    height: 12,
    width: 12,
  },
});
