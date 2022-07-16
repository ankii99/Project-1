import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { AppColor } from "../../Config/appColor";
import { Path } from "../../Config/Path";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import RNGooglePlaces from "react-native-google-places";
import { useState } from "react";
import { useRef } from "react";
const LocationPicker = ({ route,navigation }) => {
    const mapRef = useRef(null);
  const [address, setaddress] = useState("");
  const [city1, setcity1] = useState("");
  const [country1, setcountry1] = useState("");
  const [code, setcode] = useState("");
  const [state1, setstate1] = useState("");
  const [sublocality1, setsublocality1] = useState("");
  const [sublocality2, setsublocality2] = useState("");
  const [sublocality3, setsublocality3] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const getPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (e) => setError(e.message)
    );
  };

  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        let tempCoords = {
            latitude: Number(place.location.latitude),
            longitude: Number(place.location.longitude),
          };
          mapRef.current.animateToCoordinate(tempCoords, 1);
        place.addressComponents.map((item, index) => {
          if (item.types[0] == "locality") {
            console.log("city", item.name);
            setcity1(item.name);
          } else if (item.types[0] == "administrative_area_level_1") {
            // state
            console.log("State", item.name);
            setstate1(item.name);
          } else if (item.types[0] == "country") {
            // country
            console.log(item.name);
            setcountry1(item.name);
          }
          if (item.types[0] == "postal_code") {
            // pincode
            console.log("pincode", item.name);
            setcode(item.name);
          } else {
            setcode("");
          }
          if (item.types[2] == "sublocality_level_1") {
            // Sublocality
            console.log("sublocality_level_1", item.long_name);
            setcode(item.long_name);
          } else {
            setcode("");
          }

          setaddress(place.address);
        });
      })
      .catch((error) => console.log(error.message));
  };

  const onRegionChangeComplete = (lat, lng) => {
     
      setPosition({
          latitude: lat,
          longitude: lng
      })
    Geocoder.init("AIzaSyDc7vco9M079shtrY-uK7I3_uOajkDJVCE");
    Geocoder.from(lat, lng)
      .then((json) => {
        // console.log(JSON.stringify(json));
        var addressComponent = json.results[0].address_components;

        addressComponent.map((item, index) => {
          // alert(item.name)
          if (item.types[0] == "locality") {
            // City
            setcity1(item.long_name);
          } else if (item.types[0] == "administrative_area_level_1") {
            // state
            setstate1(item.long_name);
          } else if (item.types[0] == "country") {
            // country
            setcountry1(item.long_name);
          } else if (item.types[2] == "sublocality_level_1") {
            console.log("sublocality", item.long_name);
            setsublocality1(item.long_name);
          } else if (item.types[2] == "sublocality_level_2") {
            console.log("sublocality", item.long_name);
            setsublocality2(item.long_name);
          } else if (item.types[2] == "sublocality_level_3") {
            console.log("sublocality", item.long_name);
            setsublocality3(item.long_name);
          } else if (item.types[0] == "postal_code") {
            // pincode
            setcode(item.long_name);
            console.log("pincode", item.long_name);
          }
        });

        setaddress(json.results[0].formatted_address);
      })
      .catch((error) => console.warn(error));
  };

  React.useEffect(() => {
    getPosition();
  }, []);
  return (
    <View style={[styles.mapView]}>
      {position.latitude != 0 && (
        <MapView
        ref={mapRef}
        provider='google'
          style={[styles.mapView]}
          onMapReady={()=>{
            if(mapRef!=null){
              mapRef?.current?.animateCamera({
                zoom: 14,
              })
            }
            
          }}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(e) => {
            onRegionChangeComplete(e.latitude, e.longitude);
          }}
        />
      )}

      <View style={[styles.markerView]}>
        <Image style={[styles.markerImage]} source={Path.marker} />
      </View>
      <View style={[styles.backView]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            
            navigation.goBack();
          }}
        >
          <Image
            style={[
              styles.searchImage,
              { tintColor: AppColor.APP_GREEN, marginRight: 5, marginLeft: 0 },
            ]}
            source={Path.back}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchView]} onPress={openSearchModal}>
          <Image style={[styles.searchImage]} source={Path.search} />
          <Text style={[styles.searchText]}>
            {address == "" ? "Select Location" : address}{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.confirm]} activeOpacity={0.8} onPress={()=>{
          route.params.onBack(position.latitude,position.longitude,address)
          navigation.goBack()
      }} >
        <Text style={[styles.confirmText]}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  backView: {
    flexDirection: "row",
    alignItems: "center",

    width: "92%",
    alignSelf: "center",
    position: "absolute",
    top: 30,
  },

  searchView: {
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    backgroundColor: AppColor.APP_LGREEN,
    flex: 1,
  },
  searchText: {
    fontSize: 17,
    color: AppColor.APP_GREEN,
    marginLeft: 20,
    flex: 1,
    marginRight: 10,
  },
  searchImage: {
    height: 20,
    width: 20,
    tintColor: AppColor.APP_GREEN,
    marginLeft: 20,
  },
  confirm: {
    height: 50,
    width: "80%",
    borderRadius: 25,
    backgroundColor: AppColor.APP_GREEN,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
  },
  confirmText: {
    fontSize: 17,
    fontWeight: "600",
    color: AppColor.APP_LGREEN,
  },
  markerView: {
    backgroundColor: "transparent",
    position: "absolute",
    top: "45%",
    bottom: "50%",
    right: "50%",
    left: "40%",
  },
  markerImage: {
    height: 70,
    width: 70,
  },
});
