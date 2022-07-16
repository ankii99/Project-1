import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../../Components/Container";
import { PasswordchangeStyle } from "./Style";
import { Path } from "../../Config/Path";
import AppInput from "../../Components/AppInput";
import AppButton from "../../Components/AppButton";
import Appheader from "../../Components/Appheader";
import { AppColor } from "../../Config/appColor";
import { useDispatch, useSelector } from "react-redux";
import { changepassword } from "../../redux/action";
import { getData } from "../../Config/storage";
import { key } from "../../Config/Key";
import Loader from "../../Components/Loader";
import { Auth, Main } from "../../AppNavigation/ScreensName";
import { CLEAR_STATES } from "../../redux/constants";

export default function Passwordchange({ navigation }) {
  const [userData, setData] = useState({
    old_password: "",
    new_password: "",
    password_confirm: "",
  });
  const { old_password, new_password, password_confirm } = userData;
  const { isLoading, isError , isNavigate} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changepasswordApi = async () => {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-12])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (old_password == "") {
      alert("Please enter the old password");
    } else if (reg.test(old_password) == false) {
      alert(
        "Please enter Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character "
      );
    } else if (new_password == "") {
      alert("Please enter the new password");
    } else if (reg.test(new_password) == false) {
      alert(
        "Please enter Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character "
      );
    } else if (password_confirm == "") {
      alert("Please enter the confirm password");
    } else if (reg.test(password_confirm) == false) {
      alert(
        "Please enter Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character "
      );
    } else {
      dispatch(
        changepassword(
          JSON.stringify({ ...userData, id: await getData(key.userId) })
        )
      );
    }
  };

  useEffect(() => {
    if (isNavigate) {
      navigation.replace(Main.Home);
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
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={PasswordchangeStyle.container}>
            <View style={PasswordchangeStyle.header}>
              <Appheader
                onPress={() => {
                  navigation.replace(Main.Home);
                }}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: "#fff",
                  marginLeft: 20,
                }}
                source={Path.leftarrow}
                text="Change password"
              />
            </View>

            <View style={PasswordchangeStyle.InputText}>
              <AppInput
                value={old_password}
                label="Old Password"
                onChangeText={(e) => {
                  setData({ ...userData, old_password: e });
                }}
              />
              <AppInput
                label="New Password"
                value={new_password}
                onChangeText={(e) => {
                  setData({ ...userData, new_password: e });
                }}
              />
              <AppInput
                label="Confirm Password"
                value={password_confirm}
                onChangeText={(e) => {
                  setData({ ...userData, password_confirm: e });
                }}
              />
            </View>
            <View style={PasswordchangeStyle.btnContainer}>
              <AppButton
                onPress={() => {
                  changepasswordApi();
                }}
                text={"Change Password"}
                style={{
                  height: 50,
                  width: "60%",
                  borderRadius: 25,
                  backgroundColor: AppColor.APP_LGREEN,
                  alignItems: "center",
                  justifyContent: "center",
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
