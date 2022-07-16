import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

export const EditprofileStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"red"
  },
  imageContainer: {
    height: 250,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"blue"
  },
  imageView: {
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },

  inputContainer: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    // backgroundColor:"orange"
  },
  btnContainer: {
    height: 100,
    width: "100%",
    alignItems: "center",
    // backgroundColor:"red"
  },
  cameraView: {
    height: 50,
    width: 55,
    backgroundColor: "#fff",
    position: "absolute",
    ...ifIphoneX(
      {
        top: 270,
      },
      {
        top: 260,
      }
    ),
    left: 240,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
