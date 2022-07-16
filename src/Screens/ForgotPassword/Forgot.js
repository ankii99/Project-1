import { View, Text, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { ForgotStyle } from "./Style";
import Container from "../../Components/Container";
import { Path } from "../../Config/Path";
import AppInput from "../../Components/AppInput";
import AppButton from "../../Components/AppButton";
import Appheader from "../../Components/Appheader";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { forgotpassword } from "../../redux/action";
import { CLEAR_STATES } from "../../redux/constants";
import Loader from "../../Components/Loader";
import { Auth } from "../../AppNavigation/ScreensName";

export default function Forgot({ navigation }) {
  const [userData, setData] = useState({
    email: "",
  });
  const { email } = userData;

  const dispatch = useDispatch();
  const { isNavigate, isLoading, isError } = useSelector((state) => state.auth);

  const forgotpasswordApi = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "") {
      alert("Please enter the email");
    } else if (reg.test(email) === false) {
      alert("Please enter valid email address");
    } else {
      dispatch(forgotpassword(JSON.stringify(userData)));
    }
  };
  useEffect(() => {
    if (isNavigate) {
      navigation.replace(Auth.Login);
      dispatch({ type: CLEAR_STATES });
    }
  }, [isNavigate]);

  useEffect(() => {
    if (isError) {
      Alert.alert("Blocked", "You have been blocked by admin", [
        {
          text: "OK",
          onPress: () => {
            navigation.replace(Auth.Login);
            dispatch({ type: CLEAR_STATES });
          },
        },
      ]);
    }
  }, [isError]);
  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={ForgotStyle.container}>
            <View style={ForgotStyle.TextContainer1}>
              <Appheader
                onPress={() => {
                  navigation.navigate("Login");
                }}
                text={"Forgot Password"}
                source={Path.leftarrow}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: "#fff",
                }}
              />
            </View>
            <View style={ForgotStyle.TextContainer2}>
              <Text style={ForgotStyle.text2}>
                Please enter your registered email address to reset your
                password.
              </Text>
            </View>
            <View style={ForgotStyle.inputContainer}>
              <AppInput
                value={email}
                label="Email"
                onChangeText={(e) => {
                  setData({ ...userData, email: e });
                }}
              />
            </View>
            <View style={ForgotStyle.btnContainer}>
              <AppButton
                text={"Send"}
                onPress={() => {
                  forgotpasswordApi();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading && <Loader />}
    </Container>
  );
}
