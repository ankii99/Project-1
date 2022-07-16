import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../Components/Container";
import AppButton from "../../Components/AppButton";
import AppInput from "../../Components/AppInput";
import { signupStyle } from "./Styles";
import { register } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_STATES } from "../../redux/constants";
import { Auth, Main } from "../../AppNavigation/ScreensName";
import Loader from "../../Components/Loader";
import { getData } from "../../Config/storage";

export default function Signup({ navigation }) {
  const [userData, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const { name, email, password, password_confirm } = userData;

  const { isNavigate, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleApi = async () => {
    let reg1 =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-12])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name == "") {
      alert("Please enter the name");
    } else if (email == "") {
      alert("Please enter the email");
    } else if (reg.test(email) === false) {
      alert("Please enter valid email address");
    } else if (password == "") {
      alert("Please enter the password");
    } else if (reg1.test(password) == false) {
      alert(
        "Please enter Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character "
      );
    } else if (password_confirm == "") {
      alert("Please enter the confirm password");
    } else if (reg1.test(password_confirm) == false) {
      alert(
        "Please enter Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character "
      );
    } else {
      dispatch(register(JSON.stringify(userData)));
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <View style={signupStyle.mainContainer}>
            <View style={signupStyle.textContainer}>
              <View style={signupStyle.textContainer1}>
                <Text style={signupStyle.text1}>Join the,</Text>
                <Text style={signupStyle.text2}>TamPal Community</Text>
              </View>
            </View>
            <View style={signupStyle.inputContainer}>
              <AppInput
                label="Name"
                value={name}
                onChangeText={(e) => {
                  setData({ ...userData, name: e });
                }}
              />
              <AppInput
                label="Email"
                value={email}
                onChangeText={(e) => {
                  setData({ ...userData, email: e });
                }}
              />
              <AppInput
                label="Password"
                value={password}
                SecureEntry={true}
                onChangeText={(e) => {
                  setData({ ...userData, password: e });
                }}
              />
              <AppInput
                label="Confirm Password"
                value={password_confirm}
                SecureEntry={true}
                onChangeText={(e) => {
                  setData({ ...userData, password_confirm: e });
                }}
              />
            </View>
            <View style={signupStyle.btnContainer}>
              <AppButton
                text={"Join"}
                onPress={() => {
                  handleApi();
                }}
              />
              <TouchableOpacity
                style={signupStyle.pressableView}
                onPress={() => {
                  navigation.replace(Main.Home);
                }}
              >
                <Text style={signupStyle.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={signupStyle.textContainer2}>
              <Text style={signupStyle.textContainer2Text1}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace(Auth.Login);
                }}
              >
                <Text style={signupStyle.textContainer2Text2}>Log In </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading && <Loader />}
    </Container>
  );
}
