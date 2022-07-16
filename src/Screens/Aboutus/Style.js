import { StyleSheet } from "react-native";

export const AboutusStyle = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor:"red",
    alignItems: "center",
  },
  header:{
    height:"15%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  imageContainer: {
    height: "35%",
    width: "80%",
  },
  image: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
  },

  Text2: {
    height: "30%",
    width: "80%",
  },
  Text: {
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign:"left"
  },
  btnContainer: {
    height: "20%",
    width: "100%",
    // backgroundColor:"skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
