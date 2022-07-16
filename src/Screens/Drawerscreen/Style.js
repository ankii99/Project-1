import { StyleSheet } from "react-native";

export const DrawerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#217C79",

    alignItems: "center",
  },
  imagecontainer: {
    // height: "20%",
    width: "100%",
  },
  image: {
    height: 120,
    width: 120,
    marginLeft: 20,
    // backgroundColor: "blue",
    borderRadius: 60,
  },
  text: {
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: 20,
    padding: 10,
    color: "#fff",
  },
  textContainer: {
    // height: "15%",
    width: "100%",
    marginTop: 20,

  },
  line: {
    width: "90%",
    height: 1,
    color: "#fff",
    backgroundColor: "#fff",
    margin: 10,
  },
  profileData: {
    height: "50%",
    width: "100%",
   
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    // height: "15%",
    width: "100%"
  },
});
