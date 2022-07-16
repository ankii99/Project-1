import { View, Text, Image, ImageBackground } from "react-native";
import React, { useEffect, useRef } from "react";
import { ThankyouStyle } from "./Style";
import Container from "../../Components/Container";
import { Path } from "../../Config/Path";
import { Main } from "../../AppNavigation/ScreensName";

export default function Thankyou({ navigation }) {
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.navigate(Main.Home);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  });
  return (
    <Container>
      <View style={ThankyouStyle.container}>
        <ImageBackground
          source={Path.thankyou}
          resizeMode="contain"
          style={ThankyouStyle.image}
        >
          <View style={ThankyouStyle.textContainer}>
            <Text style={ThankyouStyle.text1}>Thank You !</Text>
            <Text style={ThankyouStyle.text2}>For Submitting</Text>
          </View>
        </ImageBackground>
      </View>
    </Container>
  );
}
