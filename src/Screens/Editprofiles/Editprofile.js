import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import Container from "../../Components/Container";
import { EditprofileStyle } from "./Style";
import { Path } from "../../Config/Path";
import AppInput from "../../Components/AppInput";
import AppButton from "../../Components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import Appheader from "../../Components/Appheader";
import { AppColor } from "../../Config/appColor";
import { CLEAR_STATES } from "../../redux/constants";
import { imageuploadApi, updateprofileApi } from "../../redux/action";
import { Auth, Main } from "../../AppNavigation/ScreensName";
import Loader from "../../Components/Loader";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ActionSheet from "react-native-actionsheet";

export default function Editprofile({ navigation }) {
  const { isNavigate, userProfile, isLoading, isError } = useSelector(
    (state) => state.auth
  );

  const [userData, setData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    id: userProfile.id + "",
  });

  const [pImage, setImage] = useState(
    userProfile.imageurl == null ? Path.logo : userProfile.imageurl
  );

  const { email, name } = userData;
  const action = React.createRef();
  const dispatch = useDispatch();
  const editprofileApi = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name == "") {
      alert("Please enter the name");
    } else if (email == "") {
      alert("Please enter the email");
    } else if (reg.test(email) === false) {
      alert("Please enter valid email address");
    } else {
      dispatch(updateprofileApi(userData));
    }
  };
  useEffect(() => {
    if (isNavigate) {
      navigation.navigate(Auth.Login);
      dispatch({ type: CLEAR_STATES });
    }
  }, [isNavigate]);

  
  useEffect(() => {
    if (userProfile) {
      console.log(userProfile);
      setImage(userProfile.imageurl);
    }
  }, [userProfile]);

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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <View style={EditprofileStyle.headerContainer}>
            <Appheader
              onPress={() => {
                navigation.replace(Main.Home);
              }}
              source={Path.leftarrow}
              text="Edit Profile"
              style={{
                height: 20,
                width: 20,
                tintColor: "#fff",
                marginLeft: 20,
              }}
            />
          </View>

          <View style={EditprofileStyle.imageContainer}>
            <View style={EditprofileStyle.imageView}>
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 100,
                }}
                source={{ uri: pImage }}
              />
            </View>
          </View>

          <View style={EditprofileStyle.inputContainer}>
            <AppInput
              label="Name"
              value={userProfile.name}
              // defaultValue={userProfile.name}
              onChangeText={(e) => {
                setData({ ...userData, name: e });
              }}
            />
            <AppInput
              label="Email"
              value={userProfile.email}
              // defaultValue={userProfile.email}
              onChangeText={(e) => {
                setData({ ...userData, email: e });
              }}
            />
          </View>
          <View style={EditprofileStyle.btnContainer}>
            <AppButton
              onPress={() => {
                editprofileApi();
              }}
              text="Save Changes"
              style={{
                height: 50,
                width: "45%",
                borderRadius: 25,
                backgroundColor: AppColor.APP_LGREEN,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
          <View style={EditprofileStyle.cameraView}>
            <TouchableOpacity
              onPress={() => {
                action.current.show();
              }}
            >
              <Image source={Path.camera} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading && <Loader />}
      <ActionSheet
        ref={action}
        title={"choose image"}
        options={["Camera", "Gallery", "Cancel"]}
        cancelButtonIndex={2}
        onPress={(index) => {
          if (index == 0) {
            launchCamera(
              {
                mediaType: "photo",
                quality: 0.4,
                maxHeight: 520,
                maxWidth: 520,
              },
              (response) => {
                if (response.didCancel) {
                } else if (response.errorCode == "permission") {
                  alert(response.errorCode);
                } else {
                  setImage(response.assets[0].uri);
                  dispatch(
                    imageuploadApi({
                      image: response.assets[0].uri,
                      id: userProfile.id + "",
                    })
                  );
                }
              }
            );
          } else if (index == 1) {
            launchImageLibrary(
              {
                mediaType: "photo",
                includeBase64: false,
                selectionLimit: 1,
                quality: 0.2,
              },
              (response) => {
                if (response.didCancel) {
                } else {
                  setImage(response.assets[0].uri);
                  dispatch(
                    imageuploadApi({
                      image: response.assets[0].uri,
                      id: userProfile.id + "",
                    })
                  );
                }
              }
            );
          }
        }}
      />
    </Container>
  );
}
