import { View, Text } from "react-native";
import React from "react";

export const SearchApi = (method, callback, name) => {
  var methodss = "";
  if (method == "") {
    methodss =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      name +
      "&key=AIzaSyDc7vco9M079shtrY-uK7I3_uOajkDJVCE";
  } else {
    methodss = "http://3.129.54.10:3000/api/v1/" + method;
  }
  return fetch(methodss)
    .then((response) => response.json())
    .then((responseJson) => {
      callback({ data: responseJson });
    })
    .catch((error) => {
      console.error(error);
    });
};
