import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Intro from "../Screens/Introduction/Intro";
import React from "react";
import MainDrawernavigation from "./MainDrawernavigation";
import Signup from "../Screens/Signup/Signup";
import Login from "../Screens/Login/Login";
import Forgot from "../Screens/ForgotPassword/Forgot";
import Homescreen from "../Screens/Homescreen/Homescreen";
import Addnewpin from "../Screens/Addnewpin/Addnewpin";
import Editprofile from "../Screens/Editprofiles/Editprofile";
import Passwordchange from "../Screens/Passwordchange/Passwordchange";
import About from "../Screens/Aboutus/About";
import Thankyou from "../Screens/Thankyou/Thankyou";
import ProductsPopup from "../Components/ProductsPopup";
import PostiveFeeback1 from "../Components/PostiveFeeback1";
import ThankyouPopup from "../Components/ThankyouPopup";
import PostiveFeedback2 from "../Components/PostiveFeedback2";
import SorryPopup from "../Components/SorryPopup";
import { Auth, Main } from "./ScreensName";
import LocationPicker from "../Screens/Addnewpin/LocationPicker";
import Terms from "../Screens/Terms/Terms";
const Stack = createStackNavigator();
export default function MainStacknavigation({ route }) {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={route}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={Auth.Intro} component={Intro} />
        <Stack.Screen name={Auth.register} component={Signup} />
        <Stack.Screen name={Auth.Login} component={Login} />
        <Stack.Screen name={Auth.Forgot} component={Forgot} />
        <Stack.Screen name={Main.Addpin} component={Addnewpin} />
        <Stack.Screen name={Auth.Editprofile} component={Editprofile} />
        <Stack.Screen name={Auth.Passwordchange} component={Passwordchange} />
        <Stack.Screen name={Main.About} component={About} />
        <Stack.Screen name={Main.Thankyou} component={Thankyou} />
        <Stack.Screen name={Main.Product} component={ProductsPopup} />
        <Stack.Screen name={Main.Postivefeedback} component={PostiveFeeback1} />
        <Stack.Screen name={Main.Thankyoufeedback} component={ThankyouPopup} />
        <Stack.Screen
          name={Main.Negtivefeedback}
          component={PostiveFeedback2}
        />
        <Stack.Screen
          name={Main.Terms}
          component={Terms}
        />
        <Stack.Screen name={Main.Sorryfeedback} component={SorryPopup} />
        <Stack.Screen name={Main.Home} component={MainDrawernavigation} />
        <Stack.Screen options={{presentation:"modal"}} name={Main.Location} component={LocationPicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
