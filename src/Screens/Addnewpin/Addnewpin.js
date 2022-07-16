import {
  Dimensions,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../../Components/Container";
import { AddnewpinStyle } from "./Style";
import { Path } from "../../Config/Path";
import AppButton from "../../Components/AppButton";
import Appheader from "../../Components/Appheader";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import DispenseView from "../../Components/DispenseView";
import PinInputs from "../../Components/PinInputs";
import Productbrands from "../../Components/Productbrands";
import Productstype from "../../Components/Productstype";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import RNGooglePlaces from "react-native-google-places";
import { Auth, Main } from "../../AppNavigation/ScreensName";
import { addpinApi, getProducts } from "../../redux/action";
import { getData } from "../../Config/storage";
import { useDispatch, useSelector } from "react-redux";
import { key } from "../../Config/Key";
import { AppColor } from "../../Config/appColor";


export default function Addnewpin({ navigation }) {
  const [show, setshow] = useState(false);
  const [type, setType] = React.useState([
    { id: 1, title: "Tampons", isPaid: 0, isFree: 0 },
    { id: 2, title: "Pad (disposable)", isPaid: 0, isFree: 0 },
    { id: 3, title: "Pad (reusable)", isPaid: 0, isFree: 0 },
    { id: 4, title: "Menstrual Cup", isPaid: 0, isFree: 0 },
    { id: 5, title: "Other", isPaid: 0, isFree: 0 },
  ]);
  const [newData, setNew] = React.useState([]);
  const [showbrands, setshowbrands] = useState(false);
  const [productstype, setproductstype] = useState(false);
  const [isSelect, setSelect] = React.useState(-1);
  const [address1, setaddress1] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [dispenser, setDispenser] = useState([]);
  const [brands, setBrands] = useState([]);
  const [userData, setData] = useState({
    lat: "",
    lng: "",
    location: "",
    location_detail: "",
    dispense_type: "",
    product_type: "",
    product_brand: "",
  });

  const {
    lat,
    lng,
    location,
    location_detail,
    dispense_type,
    product_brand,
    product_type,
  } = userData;
  const dispatch = useDispatch();
  const { isNavigate, userpinData, isLoading, isError, products } = useSelector(
    (state) => state.auth
  );
  const addPinApi = async () => {
    if (location == "") {
      alert("Please enter the location");
    } else if (location_detail == "") {
      alert("Please enter the Loaction details");
    } else if (dispense_type == "") {
      alert("Please enter the Dispenser Type");
    } else if (newData.length == 0) {
      alert("Please select the Product Type");
    } else if (product_brand == "") {
      alert("Please enter the Product Brand");
    } else {
      dispatch(
        addpinApi(
          JSON.stringify({ ...userData, id: await getData(key.userId) })
        )
      );
    }
  };

  useEffect(() => {
    if (isNavigate) {
      navigation.replace(Main.Thankyou);
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

  const onBack = (lat, long, address) => {
    setaddress1(address),
      setData({
        ...userData,
        lat: lat,
        lng: long,
        location: address,
      });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (products != null) {
      setType(products.productType)
      setBrands(products.productBrand)
      setDispenser(products.dispenseType)
    }
  }, [products]);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={AddnewpinStyle.mainView}>
            <View style={AddnewpinStyle.header}>
              <Appheader
                onPress={() => {
                  navigation.navigate(Main.Home);
                }}
                text={"Add Pin"}
                source={Path.leftarrow}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: "#fff",
                  marginLeft: 15,
                }}
              />
            </View>
            <View style={AddnewpinStyle.inputView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(Main.Location, {
                    onBack: onBack,
                  });
                }}
              >
                <PinInputs
                  editable={false}
                  text={address1 != null && address1}
                  showlocationLogo={true}
                  leftImage={Path.location}
                  RightImage={Path.search}
                  header={"Location"}
                  Press={() => {
                    navigation.navigate(Main.Location, {
                      onBack: onBack,
                    });
                  }}
                  onChangeText={(e) => {
                    setData({ ...userData, location: e });
                  }}
                />
              </TouchableOpacity>
              <PinInputs
                value={location_detail}
                onChangeText={(e) => {
                  setData({ ...userData, location_detail: e });
                }}
                header={"Location Details"}
              />
              <TouchableOpacity
                onPress={() => {
                  setshow(true);
                }}
              >
                <PinInputs
                  editable={false}
                  value={dispense_type}
                  RightImage={Path.drop}
                  header={"Dispenser Type"}
                  onChangeText={(e) => {
                    setData({ ...userData, dispense_type: e });
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  var data = [];
                  type.map((item) => {
                    data.push({
                      ...item,
                    });
                  });
                  setproductstype(true);
                }}
              >
                <PinInputs
                  editable={false}
                  // value={product_type}
                  text={"Select dropdown for Products Type"}
                  RightImage={Path.drop}
                  marginLeft={25}
                  header={"Products Type"}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: "90%",
                  // height: 30
                  alignSelf: "center",
                }}
              >
                <FlatList
                  // style={{ marginTop: 0 }}
                  data={newData}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          backgroundColor: AppColor.APP_LGREEN,
                          marginRight: 5,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ color: AppColor.APP_GREEN, padding: 4 }}>
                          {item.title}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setshowbrands(true);
                  // setproductBrandsText("");
                }}
              >
                <PinInputs
                  editable={false}
                  value={product_brand}
                  RightImage={Path.drop}
                  header={"Products Brands"}
                  Press={() => {
                    setshowbrands(true);
                    // setproductBrandsText("");
                  }}
                  onChangeText={(e) => {
                    setData({ ...userData, product_brand: e });
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={AddnewpinStyle.btnView}>
              <AppButton
                text={"Submit"}
                onPress={() => {
                  console.log("New======>", userData);
                  addPinApi();
                }}
              />
            </View>

            {show && (
              <View style={AddnewpinStyle.dispenserType}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setshow(false);
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "90%", height: "70%" }}>
                    <FlatList
                      style={{
                        marginTop: 0,
                        width: "95%",
                        alignSelf: "center",
                      }}
                      data={dispenser}
                      renderItem={({ item, index }) => {
                        return (
                          <DispenseView
                            text={item.dispense_type}
                            onPress={() => {
                              setData({ ...userData, dispense_type: item.dispense_type }),
                                setshow(false);
                            }}
                          />
                        );
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {showbrands && (
              <View style={AddnewpinStyle.productsBrands}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setshowbrands(false);
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "90%", height: "70%" }}>
                    <FlatList
                      style={{ marginTop: 5 }}
                      data={brands}
                      renderItem={({ item, index }) => {
                        return (
                          <Productbrands
                            text={item.product_brand}
                            show={index == isSelect}
                            OnCheckPress={() => {
                              setSelect(index),
                                setData({ ...userData, product_brand: item.product_brand });
                              
                            }}
                          />
                        );
                      }}
                    />
                  </View>
                  <View style={AddnewpinStyle.addbtn}>
                    <AppButton
                      text={"Add"}
                      onPress={() => {
                        setshowbrands(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {productstype && (
              <View style={AddnewpinStyle.productstypeView}>
                <View
                  activeOpacity={1}
                  style={{
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: 30,
                      alignSelf: "flex-end",
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setproductstype(false);
                    }}
                  >
                    <Image
                      source={Path.cross}
                      style={{
                        height: 30,
                        width: 30,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <View>
                      <FlatList
                        style={{ marginTop: 0 }}
                        data={type}
                        renderItem={({ item, index }) => {
                          return (
                            <Productstype
                              freeColor={
                                item.isFree == 1
                                  ? AppColor.APP_COLOR
                                  : AppColor.APP_WHITE
                              }
                              paidColor={
                                item.isPaid == 1
                                  ? AppColor.APP_COLOR
                                  : AppColor.APP_WHITE
                              }
                              togglePressFree={() => {
                                var data = [...type];
                                data[index].isFree =
                                  data[index].isFree == 0 ? 1 : 0;
                                data[index].isPaid = 0;
                                setType(data);
                              }}
                              togglePressPaid={() => {
                                var data = [...type];
                                data[index].isFree = 0;
                                data[index].isPaid =
                                  data[index].isPaid == 0 ? 1 : 0;
                                setType(data);
                              }}
                              text={item.title}
                              show={item.isFree == 1 || item.isPaid == 1}
                            />
                          );
                        }}
                      />
                    </View>
                    <View style={AddnewpinStyle.addbtn}>
                      <AppButton
                        text={"Add"}
                        onPress={() => {
                          let add = type.filter(
                            (item) => item.isPaid || item.isFree == 1
                          );
                          setNew(add);
                          setData({
                            ...userData,
                            product_type: JSON.stringify(add),
                          });
                          setproductstype(false);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
