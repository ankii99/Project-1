import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AppColor } from "../Config/appColor";
import { TextInput } from "react-native-element-textinput";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Path } from "../Config/Path";
export default function SearchBar({ onPress,text, onPressSearch }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.menuBtn]} onPress={onPress}>
        <Image style={[styles.menuImg]} source={Path.menu} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchView} activeOpacity={0.8} onPress={onPressSearch} >
        <Text
          style={{ flex: 1,marginLeft: 20,color: AppColor.APP_GREEN }}
         
        >{text}</Text>
        <Image style={[styles.searchImage]} source={Path.search} />
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    // alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    ...ifIphoneX({ top: 50 }, { top: 30 }),
  },
  searchView: {
    height: 50,
    flex: 1,
    borderRadius: 25,
    backgroundColor: AppColor.APP_WHITE,
    flexDirection: "row",
    alignItems: "center",
  },
  searchImage: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  menuBtn: {
    height: 50,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  menuImg: {
    height: 20,
    width: 20,
  },
});
