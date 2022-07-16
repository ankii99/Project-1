import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

export const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"yellow",
    // justifyContent:"center",
    alignItems: "center",
  },
  textContainer: {
    // backgroundColor: "red",
    height: 200,
    width: "85%",
    justifyContent: "center",
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
    // backgroundColor: "blue",
    height: 200,
    width: "90%",
  },
  pressableView: {
    marginTop: 10,
    // backgroundColor: "red",
    marginLeft: "70%",
  },
  forgotText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Helvetica",
    color: "#E7F8F8",
  },
  btnContainer: {
    // backgroundColor:"red",
    height: 100,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer2: {
    // backgroundColor:"blue",
    height: 120,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    ...ifIphoneX(
      {
        marginTop: 170,
      },
      {
        marginTop: 50,
      }
    ),
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
