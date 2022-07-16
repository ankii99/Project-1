import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { LoginStyle } from "./Style";
import Container from "../../Components/Container";
import AppInput from "../../Components/AppInput";
import AppButton from "../../Components/AppButton";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action";
import { CLEAR_STATES } from "../../redux/constants";
import { Auth, Main } from "../../AppNavigation/ScreensName";
import Loader from "../../Components/Loader";
import { StackActions } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [userData, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;
  const { isNavigate, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginApi = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "") {
      alert("Please enter the email");
    } else if (reg.test(email) == false) {
      alert("Please enter valid email address");
    } else if (password == "") {
      alert("Please enter the password");
    } else {
      dispatch(login(JSON.stringify(userData)));
      console.log(userData);
    }
  };

  useEffect(() => {
    if (isNavigate) {
      navigation.replace(Main.Home);
      dispatch({ type: CLEAR_STATES });
    }
  }, [isNavigate]);

  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={LoginStyle.container}>
            <View style={LoginStyle.textContainer}>
              <Text style={LoginStyle.text1}>Log In,</Text>
              <Text style={LoginStyle.text2}>TamPal Community</Text>
            </View>
            <View style={LoginStyle.inputContainer}>
              <AppInput
                value={email}
                label="Email"
                onChangeText={(e) => {
                  setData({ ...userData, email: e });
                }}
              />
              <AppInput
                value={password}
                SecureEntry={true}
                label="Password"
                onChangeText={(e) => {
                  setData({ ...userData, password: e });
                }}
              />
              <TouchableOpacity
                style={LoginStyle.pressableView}
                onPress={() => {
                  navigation.navigate("Forgot");
                }}
              >
                <Text style={LoginStyle.forgotText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <View style={LoginStyle.btnContainer}>
              <AppButton
                text={"Log In"}
                onPress={() => {
                  loginApi();
                }}
              />
            </View>

            <View style={LoginStyle.textContainer2}>
              <Text style={LoginStyle.textContainer2Text1}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace("Signup");
                }}
              >
                <Text style={LoginStyle.textContainer2Text2}>Join Now </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading && <Loader />}
    </Container>
  );
}
