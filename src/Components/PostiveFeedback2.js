import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import React from "react";
import { Path } from "../Config/Path";
import AppButton from "./AppButton";
import { AppColor } from "../Config/appColor";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { getData } from "../Config/storage";
import { key } from "../Config/Key";

export default function PostiveFeedback2({
  onClose,
  onSubmit,
  onPressDrop,
  text,
  value,
  onChangeText,
  editable,
  placeholder,
  data,
  onCancel,
  autoFocus,
  currentAddress,
  inputRef,
}) {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    async function getToken() {
      const value = await getData(key.token);
      if (value != null && value != "") {
        setToken(value);
      }
    }
    getToken();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <ImageBackground
              source={Path.background2}
              style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}
            >
              <View style={styles.firstView}>
                <TouchableOpacity onPress={onClose}>
                  <Image source={Path.cross} style={styles.image} />
                </TouchableOpacity>
              </View>
              <View style={styles.secondView}>
                <View style={styles.firstText}>
                  <Text style={styles.feedbackText}>Feedback</Text>
                </View>
                <View style={styles.secondText}>
                  <Image
                    source={Path.pinlocation}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                      marginRight: 5,
                      marginLeft: 20,
                      tintColor: "#E25D4B",
                    }}
                  />
                  {token == null ? (
                    <Text style={styles.text2}>Library Washroom</Text>
                  ) : (
                    <Text style={styles.text2}>{currentAddress}</Text>
                  )}
                </View>
              </View>
              <View style={styles.thirdView}>
              <TouchableOpacity  onPress={onPressDrop}>
                <View style={styles.locationInput}>
                  <View style={styles.textView}>
                    <Text style={styles.text1}>What didn't you like?</Text>
                  </View>
                  <View style={styles.input1}>
                    <Text style={{ fontSize: 15 }}>{text}</Text>
                  </View>
                  <View
                    style={styles.locationImage}
                   
                  >
                    <Image source={Path.drop} style={styles.image1} />
                  </View>
                </View>
                </TouchableOpacity>
                {data && (
                  <View
                    style={{
                      // height: 40,
                      width: "90%",
                      alignSelf: "center",
                      marginTop: 10,
                    }}
                  >
                    <FlatList
                      data={data}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            backgroundColor: "#E25D4B",
                            borderRadius: 15,
                            marginRight: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              color: AppColor.APP_WHITE,
                              marginHorizontal: 15,
                              marginVertical: 5,
                            }}
                          >
                            {item.title}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => onCancel(index)}
                          >
                            <Image
                              style={{
                                height: 15,
                                width: 15,
                                tintColor: AppColor.APP_WHITE,
                                marginRight: 10,
                              }}
                              source={Path.cross}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                )}
                <View style={styles.secondInput}>
                  <View style={styles.locationInput1}>
                    <View style={styles.textView1}>
                      <Text style={styles.otherText}>
                        Others (Please specify)
                      </Text>
                    </View>
                    <View style={styles.input2}>
                      <TextInput
                        style={{ flex: 1, padding: 20 }}
                        showIcon={false}
                        value={value}
                        multiline
                        editable={editable}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        autoFocus
                        ref={inputRef}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.forthView}>
                <AppButton
                  disabled={text == ""}
                  onPress={onSubmit}
                  text={"Submit"}
                  color={AppColor.APP_WHITE}
                  style={{
                    height: 50,
                    width: "40%",
                    borderRadius: 25,
                    backgroundColor: "#E25D4B",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
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
    top: -20,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#000000AA",
  },
  mainContainer: {
    height: "65%",
    width: "95%",
    borderRadius: 20,
    backgroundColor: "#E7F8F8",
  },
  firstView: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
  },
  image: {
    height: 30,
    width: 30,
    tintColor: "#fff",
    marginLeft: "90%",
  },
  secondView: {
    height: "20%",
  },
  firstText: {
    height: "30%",
    alignItems: "center",
  },
  feedbackText: {
    fontFamily: "Helvetica",
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
  },
  secondText: {
    height: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    width: "80%",
    fontFamily: "Helvetica",
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
  },
  thirdView: {
    height: "50%",
  },
  locationInput: {
    height: 51,
    width: "92%",
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#E25D4B",
    flexDirection: "row",
    margin: 15,
  },
  textView: {
    flex: 1,
    backgroundColor: "#E9D1CD",
    alignItems: "center",
    position: "absolute",
    left: 26,
    top: -12,
  },
  text1: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Helvetica",
    color: "#E25D4B",
  },
  input1: {
    flex: 1,
    marginLeft: 25,
    justifyContent: "center",
  },
  locationImage: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image1: {
    height: 20,
    width: 20,
    tintColor: "#E25D4B",
  },
  firstInput: {
    height: "30%",
  },
  secondInput: {
    height: "70%",
  },
  locationInput1: {
    height: "80%",
    width: "92%",
    borderRadius: 30,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#E25D4B",
    flexDirection: "row",
    margin: 15,
  },
  textView1: {
    flex: 1,
    backgroundColor: "#E9D4D1",
    alignItems: "center",
    position: "absolute",
    left: 26,
    top: -12,
  },
  otherText: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Helvetica",
    color: "#E25D4B",
  },
  forthView: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  input2: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
