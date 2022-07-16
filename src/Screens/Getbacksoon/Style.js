import { StyleSheet } from "react-native";

export const GetbackStyle = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor:"red",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    alignItems:"center"
  },
  textContainer: {
    height: "100%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Helvetica",
    fontStyle: "italic",
    color: "#FFFFFF",
    marginBottom: 20,
  },
});
