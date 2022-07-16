import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppColor } from "../Config/appColor";

const AppButton = ({
  text,
  onPress,
  style = styles.btn_view,
  color = AppColor.APP_COLOR,
  fontSize = 20,
  disabled,
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={style} onPress={onPress}>
      <Text style={[styles.btn_text, { color: color, fontSize: fontSize }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btn_view: {
    height: 50,
    width: "40%",
    borderRadius: 25,
    backgroundColor: AppColor.APP_LGREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_text: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Helvetica",
  },
});
