import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MainStacknavigation from "./src/AppNavigation/MainStacknavigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { getData } from "./src/Config/storage";
import { key } from "./src/Config/Key";
import { Auth, Main } from "./src/AppNavigation/ScreensName";

export default function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const value = await getData(key.token);
      if (value != null && value != "") {
        setData(Main.Home);
      } else {
        setData(Auth.Intro);
      }
    }
    fetchData();
  }, []);

  return (
    <Provider store={store}>
      {data != "" && <MainStacknavigation route={data} />}
    </Provider>
  );
}
