import AsyncStorage from "@react-native-async-storage/async-storage";
import { key } from "./Key";

export const setData = (key, item) => {
  AsyncStorage.setItem(key, item);
};
export const getData = async (key) => {
  return await AsyncStorage.getItem(key);
};

export const deleteData = (key) => {
  AsyncStorage.removeItem(key);
};
