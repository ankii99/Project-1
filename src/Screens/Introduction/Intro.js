import React, { useRef } from "react";
import { styles } from "./Style";
import Container from "../../Components/Container";
import Swiper from "react-native-swiper";
import { Path } from "../../Config/Path";
import SwipeableView from "./IntroComponent/SwipeableView";
import { StatusBar, View } from "react-native";

export default function Intro({ navigation }) {
  const swipable = useRef(null);
  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Swiper style={styles.wrapper} ref={swipable} activeDotColor={"#fff"}>
        <SwipeableView
          showLogo={true}
          onSkip={() => {
            navigation.navigate("Signup");
          }}
          bottonText="Next"
          onPress={() => {
            swipable.current.scrollBy(1, true);
          }}
          skip="Skip"
          source={Path.marker}
          text="Find Free Products "
        />
        <SwipeableView
          onSkip={() => {
            navigation.navigate("Signup");
          }}
          bottonText="Next"
          onPress={() => {
            swipable.current.scrollBy(1, true);
          }}
          skip="Skip"
          source={Path.together}
          text=" Help others find free products "
          secondText="Pin a location that has a product dispenser or 
          where products are given out."
        />
        <SwipeableView
          onPress={() => {
            navigation.navigate("Signup");
          }}
          onSkip={() => {
            navigation.navigate("Signup");
          }}
          bottonText="Get Started"
          skip="Skip"
          source={Path.feedback}
          text="Share feedback about a product dispenser location."
        />
      </Swiper>
    </Container>
  );
}
