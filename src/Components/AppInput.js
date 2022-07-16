import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput } from "react-native-element-textinput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { AppColor } from "../Config/appColor";

const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  style,
  source,
  onPress,
  SecureEntry,
  defaultValue
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={defaultValue}
        value={value}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        label={label}
        placeholder={placeholder} 
        placeholderTextColor={AppColor.APP_WHITE}
        onChangeText={onChangeText}
        placeholderStyle={{color:"#fff"}}
        secureTextEntry={SecureEntry}
        iconStyle={{tintColor:"white"}}
      />
      <TouchableOpacity style={[styles.dropBtn]} onPress={onPress}>
        <Image style={[styles.dropImg]} source={source} />
      </TouchableOpacity>
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 51,
    paddingHorizontal: 12,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: AppColor.APP_WHITE,
    color: AppColor.APP_WHITE,
  },
  inputStyle: {
    fontSize: 16,
    color: "#fff",
    marginLeft:15
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: "400",
    position: "absolute",
    top: -12,
    backgroundColor: "#052120",
    paddingHorizontal: 4,
    marginLeft: 10,
    color: "#BDD9BF",
  },
  placeholderStyle: {
    fontSize: 16,
   
  },
  textErrorStyle: {
    fontSize: 16,
  },
  dropBtn: {
    height:40,
    width: 40,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    right: 20,
    top: -37,
  },
  dropImg: {
    height: 20,
    width: 20,
    tintColor: "#fff",
  },
});
