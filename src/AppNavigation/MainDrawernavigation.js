import { View, Text } from "react-native";
import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Homescreen from "../Screens/Homescreen/Homescreen";
import Drawer from "../Screens/Drawerscreen/Drawer";
import Addnewpin from "../Screens/Addnewpin/Addnewpin";
import Editprofile from "../Screens/Editprofiles/Editprofile";
import Passwordchange from "../Screens/Passwordchange/Passwordchange";
import About from "../Screens/Aboutus/About";
import Thankyou from "../Screens/Thankyou/Thankyou";
import Login from "../Screens/Login/Login";
import ProductsPopup from "../Components/ProductsPopup";
import PostiveFeeback1 from "../Components/PostiveFeeback1";
import ThankyouPopup from "../Components/ThankyouPopup";
import PostiveFeedback2 from "../Components/PostiveFeedback2";
import SorryPopup from "../Components/SorryPopup";
import Forgot from "../Screens/ForgotPassword/Forgot";
import Signup from "../Screens/Signup/Signup";
import { Auth, Main } from "./ScreensName";
import Terms from "../Screens/Terms/Terms";

const DrawerStack = createDrawerNavigator();

export default function MainDrawernavigation() {
  return (
    // <NavigationContainer independent={true}>
      <DrawerStack.Navigator
        initialRouteName={Main.Home}
        drawerContent={(props) => <Drawer {...props} />}
        screenOptions={{ drawerPosition: "left", headerShown: false }}
      >
        <DrawerStack.Screen name={Main.Home} component={Homescreen} />
        <DrawerStack.Screen name={Main.Addpin} component={Addnewpin} />
        <DrawerStack.Screen name={Auth.Editprofile} component={Editprofile} />
        <DrawerStack.Screen
          name={Auth.Passwordchange}
          component={Passwordchange}
        />
        <DrawerStack.Screen name={Main.About} component={About} />
        <DrawerStack.Screen name={Main.Thankyou} component={Thankyou} />
        <DrawerStack.Screen
          name={Auth.Login}
          component={Login}
          options={{ swipeEnabled: false }}
        />
        <DrawerStack.Screen
          name={Main.Terms}
          component={Terms}
          options={{ swipeEnabled: false }}
        />
        {/* <DrawerStack.Screen name={Main.Product} component={ProductsPopup} /> */}
        {/* <DrawerStack.Screen name={Main.Postivefeedback}component={PostiveFeeback1} /> */}
        {/* <DrawerStack.Screen name={Main.Thankyoufeedback} component={ThankyouPopup} /> */}
        {/* <DrawerStack.Screen name={Main.Negtivefeedback} component={PostiveFeedback2} /> */}
        {/* <DrawerStack.Screen name={Main.Sorryfeedback}component={SorryPopup} /> */}
        <DrawerStack.Screen name={Auth.Forgot} component={Forgot} />
        <DrawerStack.Screen name={Auth.register} component={Signup} />
      </DrawerStack.Navigator>
    // </NavigationContainer>
  );
}
