import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Path } from "../Config/Path";

export default function FloatButton({onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <Image source={Path.add} />
      <Text style={styles.text}>Add Pin</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom:50,
    width:"20%",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    // borderRadius:60
  },
  text:{
    marginTop:10,
    fontSize:16,
    fontWeight:"700",
    color:"#052120",
  }
});
