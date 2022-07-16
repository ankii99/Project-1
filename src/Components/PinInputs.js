import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AddnewpinStyle } from "../Screens/Addnewpin/Style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-element-textinput";
import { AppColor } from "../Config/appColor";

export default function PinInputs({
  leftImage,
  RightImage,
  header,
  Press,
  onChangeText,
  value,
  showlocationLogo,
  onLocationPress,
  text,
  editable,
  marginLeft,
}) {
  return (
    <View style={AddnewpinStyle.locationInput}>
      <View style={AddnewpinStyle.textView}>
        <Text style={AddnewpinStyle.text1}>{header}</Text>
      </View>
      {showlocationLogo && (
        <TouchableOpacity
          disabled={true}
          style={AddnewpinStyle.locationImage}
          onPress={onLocationPress}
        >
          <Image source={leftImage} style={AddnewpinStyle.image1} />
        </TouchableOpacity>
      )}

      <View style={AddnewpinStyle.input1}>
        {text ? (
          <Text style={{ color: AppColor.APP_WHITE, marginLeft: marginLeft }}>
            {text}
          </Text>
        ) : (
          <TextInput
            style={[
              AddnewpinStyle.inputText,
              { marginLeft: showlocationLogo ? 0 : 25 },
            ]}
            value={value}
            onChangeText={onChangeText}
            inputStyle={{ color: "white" }}
            editable={editable}
            iconStyle={{ tintColor: "white" }}
          />
        )}
      </View>

      <TouchableOpacity
        disabled={true}
        style={AddnewpinStyle.locationImage}
        onPress={Press}
      >
        <Image source={RightImage} style={AddnewpinStyle.image1} />
      </TouchableOpacity>
    </View>
  );
}
// const styles = StyleSheet.create({
//   inputView: {
//     height: "60%",
//     width: "100%",
//     // backgroundColor: "skyblue",
//   },
//   locationInput: {
//     height: 51,
//     width: "92%",
//     borderRadius: 50,
//     alignSelf: "center",
//     borderWidth: 2,
//     borderColor: "#fff",
//     flexDirection: "row",
//     margin: 15,
//   },
//   locationImage: {
//     width: 50,
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image1: {
//     height: 20,
//     width: 20,
//     tintColor: "#fff",
//   },
//   input1: {
//     flex: 1,
//   },
// });
