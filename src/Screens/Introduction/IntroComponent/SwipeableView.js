import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { styles } from "../Style";
import { Path } from "../../../Config/Path";

const SwipeableView = ({
  text,
  source,
  bottonText,
  skip,
  secondText,
  onPress,
  onSkip,
  showLogo,
}) => {
  return (
    <View style={styles.box1}>
      <View style={styles.slide1}>
        {showLogo && (
          <View style={styles.imageContainer}>
            <Image
              style={{ height: "100%", width: "100%" }}
              source={Path.horizontalLogo}
            />
          </View>
        )}

        <Text
          style={[
            styles.text,
            { marginTop: 10, padding: 10, textAlign: "center", width: "80%" },
          ]}
        >
          {text}
        </Text>
        <Text
          style={[
            styles.text,
            {
              margin: 20,
              fontSize: 14,
              fontWeight: "400",
              textAlign: "center",
            },
          ]}
        >
          {secondText}
        </Text>
      </View>
      <View style={styles.imageView}>
        <Image style={styles.image1} source={source} />
      </View>
      <View style={styles.button1}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{bottonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pressableView} onPress={onSkip}>
          <Text style={styles.text2}>{skip}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwipeableView;
