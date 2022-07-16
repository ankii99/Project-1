import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

export const signupStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textContainer: {
    // backgroundColor:"blue",
    height: 100,
    justifyContent: "center",
  },
  textContainer1: {
    width: "80%",
    alignSelf: "center",
  },
  text1: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "Helvetica",
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  text2: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Helvetica",

    color: "#FFFFFF",
  },
  inputContainer: {
    // backgroundColor:"red",
    height: 320,
    width: "100%",
  },
  btnContainer: {
    // backgroundColor:"blue",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  skipText: {
    color: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 24,
    fontWeight: "400",
  },
  pressableView: {
    height: "20%",
    width: "40%",
    marginTop: 20,
    alignItems: "center",
  },
  textContainer2: {
    //  backgroundColor:"red",
    ...ifIphoneX(
      {
        height: 200,
      },
      { height: 40 }
    ),

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer2Text1: {
    marginTop: 20,
    fontSize: 12,
    color: "#FFFFFF",
  },
  textContainer2Text2: {
    color: "#FFFFFF",
    marginTop: 20,
    fontSize: 14,
  },
});
