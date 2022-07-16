import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DrawerStyle } from "./Style";
import { Path } from "../../Config/Path";
import AppButton from "../../Components/AppButton";
import ProfileData from "../../Components/ProfileData";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { AppColor } from "../../Config/appColor";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action";
import { getData } from "../../Config/storage";
import { key } from "../../Config/Key";
import { CLEAR_STATES } from "../../redux/constants";
import { Auth, Main } from "../../AppNavigation/ScreensName";

export default function Drawer({ props, navigation }) {
  let height = useWindowDimensions().height;
  let width = useWindowDimensions().width;

  const [userData, setData] = useState({});
  const [token, setToken] = React.useState("");
  const dispatch = useDispatch();
  const { isNavigate, userProfile } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(
    userProfile.imageurl == null ? Path.logo : userProfile.imageurl
  );
  const logoutApi = async () => {
    dispatch(logout({ id: await getData(key.userId) }));
  };
  useEffect(() => {
    if (isNavigate) {
      navigation.reset({
        index: 0,
        routes: [{ name: Auth.Login }],
      });
      dispatch({ type: CLEAR_STATES });
    }
  }, [isNavigate]);

  React.useEffect(() => {
    async function getToken() {
      const value = await getData(key.token);
      if (value != null && value != "") {
        setToken(value);
      }
    }
    getToken();
  }, []);
  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile.imageurl);
    }
  }, [userProfile]);
  return (
    <DrawerContentScrollView
      style={{ height: height, backgroundColor: AppColor.APP_COLOR }}
      {...props}
    >
      <View style={[DrawerStyle.container, { height: height }]}>
        {token != "" ? (
          <View style={DrawerStyle.imagecontainer}>
            <Image source={{ uri: profile }} style={DrawerStyle.image} />
          </View>
        ) : (
          <View
            style={{
              height: 200,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Image
              source={Path.dummy}
              style={{
                height: 100,
                width: 100,
                marginLeft: 20,
              }}
            />
          </View>
        )}

        {token != "" && (
          <View style={DrawerStyle.textContainer}>
            <Text style={DrawerStyle.text}>{userProfile.name}</Text>
            <Text style={DrawerStyle.text}>{userProfile.email}</Text>
            <View style={DrawerStyle.line}></View>
          </View>
        )}
        <View style={DrawerStyle.profileData}>
          {token != "" && (
            <ProfileData
              source={Path.icon1}
              text={"Edit Profile"}
              onPress={() => {
                navigation.navigate(Auth.Editprofile);
              }}
            />
          )}
          {token != "" && (
            <ProfileData
              source={Path.icon2}
              text={"Change Password"}
              onPress={() => {
                navigation.navigate(Auth.Passwordchange);
              }}
            />
          )}
          <ProfileData
            source={Path.icon3}
            text={"About Us"}
            onPress={() => {
              navigation.navigate(Main.About);
            }}
          />
          <ProfileData
            source={Path.icon4}
            text={"Contact Us"}
            onPress={() => {
              Linking.openURL(
                "mailto:example@gmail.com?subject=Subject&body="
              );
            }}
          />
          <ProfileData
            source={Path.icon5}
            text={"Privacy Policies"}
            onPress={() => {
              navigation.navigate(Main.Terms);
            }}
          />
          <ProfileData
            source={Path.icon6}
            text={"Terms & Conditions"}
            onPress={() => {
              navigation.navigate(Main.Terms);
            }}
          />
        </View>
        <View style={DrawerStyle.btn}>
          <AppButton
            style={{
              width: "65%",
              height: 50,
              backgroundColor: "#fff",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
            text={token != "" ? "Log Out" : "Login / Sign Up"}
            onPress={() => {
              if (token != "") {
                Alert.alert("Alert", "Are you sure you want to logout?", [
                  {
                    text: "No",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      logoutApi();
                    },
                  },
                ]);
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: Auth.Login }],
                });
              }
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
