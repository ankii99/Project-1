import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppColor } from "../Config/appColor";

export default function Productstype({
  text,
  OnCheckPress,
  show,
  togglePressFree,
  togglePressPaid,
  freeColor = 0,
  paidColor = 0,
}) {
  const [isSelected, setisSelected] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.checkView}>
        <Checkbox show={show} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text1}>{text}</Text>
      </View>
      <View style={[styles.textView1]}>
        <TouchableOpacity
          onPress={togglePressFree}
          style={[styles.textView2round, { backgroundColor: freeColor }]}
        >
          <Text
            style={[
              styles.freeText,
              {
                color:
                  freeColor == AppColor.APP_COLOR
                    ? AppColor.APP_WHITE
                    : AppColor.APP_COLOR,
              },
            ]}
          >
            Free
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.textView2]}>
        <TouchableOpacity
          onPress={togglePressPaid}
          style={[styles.textView2round, { backgroundColor: paidColor }]}
        >
          <Text
            style={[
              styles.paidText,
              {
                color:
                  paidColor == AppColor.APP_COLOR
                    ? AppColor.APP_WHITE
                    : AppColor.APP_COLOR,
              },
            ]}
          >
            Paid
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "90%",
    borderRadius: 25,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#E7F8F8",
    marginBottom: 5,
    flexDirection: "row",
  },
  checkView: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  textView: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  text1: {
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "400",
  },
  textView1: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textView1round: {
    height: 38,
    width: 42,
    borderRadius: 21,
    backgroundColor: "#00A8A8",
    justifyContent: "center",
    alignItems: "center",
  },
  freeText: {
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: "400",
  },
  textView2: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textView2round: {
    height: 38,
    width: 42,
    borderRadius: 21,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#00A8A8",
    borderWidth: 1,
  },
  paidText: {
    fontSize: 13,
    fontFamily: "Helvetica",
    fontWeight: "400",
  },
});
