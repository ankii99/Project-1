import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Path } from "../Config/Path";
import AppButton from "./AppButton";
import { AppColor } from "../Config/appColor";
// import { TextInput } from "react-native-element-textinput";÷
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { ScrollView } from "react-native-gesture-handler";
import { getData } from "../Config/storage";
import { key } from "../Config/Key";

export default function PostiveFeeback1({
  onPress,
  text,
  onClose,
  onPressSubmit,
  onChangeText,
  placeholder,
  editable,
  value,
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

  React.useEffect(()=>{
    if(editable){
    
    }
  },[editable])
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <ImageBackground
              source={Path.background1}
              style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}
            >
              <View style={styles.firstView}>
                <TouchableOpacity onPress={onClose}>
                  <Image source={Path.cross} style={styles.image} />
                </TouchableOpacity>
              </View>
              <View style={styles.secondView}>
                <View style={styles.firstText}>
                  <Text style={styles.text1}>Feedback</Text>
                </View>
                <View style={styles.secondText}>
                  <Image
                    source={Path.pinlocation}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                      marginRight: 5,
                      marginLeft:20,
                      alignItems: "center",
                      justifyContent: "center",
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
              <TouchableOpacity  onPress={onPress}>
                <View style={styles.firstInput}>
                  <View style={styles.locationInput1}>
                   
                    <View style={styles.textView1}>
                      <Text style={styles.text1}>What did you like?</Text>
                    </View>
                    <View style={styles.input1}>
                      <Text style={{ fontSize: 15, marginLeft: 5 }}>
                        {text}
                      </Text>
                    </View>
                   
                    <View
                      style={styles.locationImage}
                    
                    >
                      <Image source={Path.drop} style={styles.image1} />
                    </View>
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
                            backgroundColor: AppColor.APP_GREEN,
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
                  <View style={styles.locationInput2}>
                    <View style={styles.textView2}>
                      <Text style={styles.text1}>Others (Please specify)</Text>
                    </View>
                    <View style={styles.input2}>
                      <TextInput
                        style={{ flex: 1, padding: 10 }}
                        showIcon={false}
                        value={value}
                        multiline
                        editable={editable}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        autoFocus
                        // blurOnSubmit={true}
                        ref={inputRef}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.forthView}>
                <AppButton
                  disabled={text == ""}
                  onPress={onPressSubmit}
                  text={"Submit"}
                  color={AppColor.APP_WHITE}
                  style={{
                    height: 50,
                    width: "40%",
                    borderRadius: 25,
                    backgroundColor: AppColor.APP_GREEN,
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
    tintColor: "#55A19F",
    marginLeft: "90%",
  },
  secondView: {
    height: "20%",
    // alignSelf:"center"
  },
  firstText: {
    height: "30%",
    alignItems: "center",
    // backgroundColor:"blue"
  },
  text1: {
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
    width:"80%",
    fontFamily: "Helvetica",
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
  },
  thirdView: {
    height: "50%",
  },

  firstInput: {
    height: "30%",
  },
  secondInput: {
    height: "70%",
  },

  forthView: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  locationInput1: {
    height: 51,
    width: "92%",
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#217C79",
    flexDirection: "row",
    margin: 15,
  },
  locationImage: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input1: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  textView1: {
    flex: 1,
    backgroundColor: "#BEE1E1",
    alignItems: "center",
    position: "absolute",
    left: 26,
    top: -12,
  },
  text1: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Helvetica",
    color: "#217C79",
  },
  header: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
  },
  image1: {
    height: 20,
    width: 20,
    tintColor: "#217C79",
  },
  locationInput2: {
    height: "80%",
    width: "92%",
    borderRadius: 30,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#217C79",
    flexDirection: "row",
    margin: 15,
  },
  input2: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  inputText: {
    flex: 1,
    // backgroundColor:"red",
    justifyContent: "center",
    padding: 10,
  },
  textView2: {
    flex: 1,
    backgroundColor: "#A9D8D6",
    alignItems: "center",
    position: "absolute",
    left: 26,
    top: -12,
  },
  text1: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Helvetica",
    color: "#217C79",
  },
  header: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
  },
  image1: {
    height: 20,
    width: 20,
    tintColor: "#217C79",
  },
});
