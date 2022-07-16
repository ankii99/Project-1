import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { Path } from "../Config/Path";

export default function SorryPopup({onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <ImageBackground source={Path.background2} style={{ flex: 1 , borderRadius: 20, overflow: "hidden"}}>
          <View style={styles.firstView}>
            <TouchableOpacity onPress={onClose}>
              <Image source={Path.cross} style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{" Sorry you didn't have a good experience "}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -60,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#000000AA",
  },
  mainContainer: {
    height: "35%",
    width: "95%",
    borderRadius: 20,
    backgroundColor: "#E7F8F8",
  },

  firstView: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
  },

  textContainer: {
    height: "85%",
    width: "90%",
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    color: "#E25D4B",
    fontSize: 24,
    fontWeight: "700",
    fontStyle: "italic",
    fontFamily: "Helvetica",
    textAlign:"center"
  },

  image: {
    height: 30,
    width: 30,
    tintColor: "#E25D4B",
    marginLeft: "90%",
  },
});
