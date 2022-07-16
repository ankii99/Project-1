import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import React from "react";

import { Path } from "../Config/Path";

export default function CurruntLocation({onPressLocation}) {
  return (
    <View>
      <TouchableOpacity 
      onPress ={onPressLocation}
      style={styles.imagecontainer}>
        <Image style={styles.imageView} source={Path.location} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  imagecontainer: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 180,
    right: 20,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  imageView: {
    height: 30,
    width: 30,
    tintColor:"red"
  },
});
