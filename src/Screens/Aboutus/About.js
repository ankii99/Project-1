import { View, Text, Image, StatusBar } from "react-native";
import React from "react";
import { AboutusStyle } from "./Style";
import Container from "../../Components/Container";
import Appheader from "../../Components/Appheader";
import AppButton from "../../Components/AppButton";
import { Path } from "../../Config/Path";
import { AppColor } from "../../Config/appColor";
import { color } from "react-native-reanimated";
import { Main } from "../../AppNavigation/ScreensName";

export default function About({ navigation }) {
  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <View style={AboutusStyle.container}>
        <View style={AboutusStyle.header}>
          <Appheader
            onPress={() => {
              navigation.replace(Main.Home);
            }}
            style={{ height: 20, width: 20, tintColor: "#fff", marginLeft: 20 }}
            source={Path.leftarrow}
            text="About Us"
          />
        </View>
        <View style={AboutusStyle.imageContainer}>
          <Image style={AboutusStyle.image} source={Path.horizontalLogo} />
        </View>
        <View style={AboutusStyle.Text2}>
          <Text style={AboutusStyle.Text}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium dolorem que laudantium, totam rem aperiam, eaqu e ipsa
            quae ab illo inventore veritatis et qu asi architecto beatae vitae
            dicta sunt expli cabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit,{" "}
          </Text>
        </View>
        <View style={AboutusStyle.btnContainer}>
          <AppButton
          fontSize={16}
            text={"Ver 1.0"}
            color={AppColor.APP_WHITE}
            style={{
              height: 50,
              width: "40%",
              borderRadius: 25,
              borderWidth: 3,
              borderColor: "#217C79",
              backgroundColor: AppColor.APP_GREEN,
              alignItems: "center",
              justifyContent: "center", 
            }}
          />
        </View>
      </View>
    </Container>
  );
}
