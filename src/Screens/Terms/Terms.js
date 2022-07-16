import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import Appheader from "../../Components/Appheader";
import { AppColor } from "../../Config/appColor";
import { Path } from "../../Config/Path";
const Terms = ({ navigation }) => {
  return (
  
      <View style={[styles.container, { backgroundColor: AppColor.APP_COLOR }]}>
          <View style={{marginTop: 40}} >
        <Appheader onPress={() => navigation.goBack()} source={Path.back} />
        </View>
        <WebView source={{ uri: "http://3.23.107.218/public/faq" }} />
      </View>
   
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
