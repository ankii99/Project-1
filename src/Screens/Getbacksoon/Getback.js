import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { GetbackStyle } from "./Style";
import Container from "../../Components/Container";
import { Path } from "../../Config/Path";

export default function Getback() {
  return (
    <Container>
      <View style={GetbackStyle.container}>
        <ImageBackground
          source={Path.thankyou}
          resizeMode="contain"
          style={GetbackStyle.image}
        >
          <View style={GetbackStyle.textContainer}>
            <Text style={GetbackStyle.text1}>We’ll get back to you soon.</Text>
          </View>
        </ImageBackground>
      </View>
    </Container>
  );
}
