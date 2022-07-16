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

export default function ThankyouPopup({ onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <ImageBackground source={Path.background1} style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}>
          <View style={styles.firstView}>
            <TouchableOpacity onPress={onClose}>
              <Image source={Path.cross} style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{"We appreciate your feedback."}</Text>
            <Text style={styles.text2}>{"Have a bloody good day!"}</Text>
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    color: "#217C79",
    fontSize: 24,
    fontWeight: "700",
    fontStyle: "italic",
    fontFamily: "Helvetica",
  },
  text2: {
    color: "#217C79",
    fontSize: 21,
    fontWeight: "700",
    fontStyle: "italic",
    fontFamily: "Helvetica",
  },
  image: {
    height: 30,
    width: 30,
    tintColor: "#55A19F",
    marginLeft: "90%",
  },
});
