import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import RNGooglePlaces from "react-native-google-places";
import { HomescrStyle } from "./Style";
import MapView, { Marker } from "react-native-maps";
import FloatButton from "../../Components/FloatButton";
import SearchBar from "../../Components/SearchBar";
import CurruntLocation from "../../Components/CurrentLocation";
import PostiveFeeback1 from "../../Components/PostiveFeeback1";
import PostiveFeedback2 from "../../Components/PostiveFeedback2";
import ThankyouPopup from "../../Components/ThankyouPopup";
import SorryPopup from "../../Components/SorryPopup";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Productbrands from "../../Components/Productbrands";
import ProductsPopup from "../../Components/ProductsPopup";
import { Path } from "../../Config/Path";
import Geolocation from "@react-native-community/geolocation";
import Checkbox from "../../Components/Checkbox";
import AppButton from "../../Components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { feedBack, getpinApi, getprofileApi } from "../../redux/action";
import { key } from "../../Config/Key";
import { getData } from "../../Config/storage";
import Loader from "../../Components/Loader";
import { ADD_PIN_DATA, CLEAR_STATES } from "../../redux/constants";
import { Auth } from "../../AppNavigation/ScreensName";
import Geocoder from "react-native-geocoding";

const DATA = [
  {
    id: 1,
    title: "Stocked with product",
    select: false,
  },
  {
    id: 2,
    title: "Stocked with the type of product I like",
    select: false,
  },
  {
    id: 3,
    title: "I like the brand stocked",
    select: false,
  },
  {
    id: 4,
    title: "I like the dispenser design",
    select: false,
  },
  {
    id: 5,
    title: "I could see the product stocked inside",
    select: false,
  },
];
const DATA1 = [
  {
    id: 1,
    title: "Out of product",
    select: false,
  },
  {
    id: 2,
    title: "Dispenser is broken",
    select: false,
  },
  {
    id: 3,
    title: "Hard to access product",
    select: false,
  },
  {
    id: 4,
    title: "I don't like the type of product stocked",
    select: false,
  },
];
const mapView = React.createRef();

export default function Homescreen({ navigation }) {
  const [token, setToken] = useState(null);
  const [currentAddres, setcurrentAddres] = useState("");
  const [listData, setListData] = React.useState(DATA);
  const [selectData, setSelectData] = React.useState([]);
  const [listData1, setListData1] = React.useState(DATA1);
  const [show, setShow] = useState(false);
  const [marker, setMarker] = useState([]);
  const [listShow, setList] = React.useState(false);
  const [listShow1, setlistShow1] = useState(false);
  const [isSelect, setSelect] = React.useState(-1);
  const [isIndex, setIndex] = React.useState(-1);
  const [text, setText] = React.useState("");
  const [showProduct, setshowProduct] = useState(false);
  const [showThankyou, setshowThankyou] = useState(false);
  const [showDislike, setshowDislike] = useState(false);
  const [showSorry, setshowSorry] = useState(false);
  const [_dataPush, set_dataPush] = useState([]);
  const [error, setError] = useState("");
  const [popupData, setpopupData] = useState("");
  const [popData, setPop] = React.useState([]);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [userData, setData] = useState({
    lat: 0,
    long: 0,
    end: 100,
  });
  const { isNavigate, userGetdata, isLoading, isError, userId, feed } =
    useSelector((state) => state.auth);
  const [submit, setSubmit] = useState(false);
  const input = React.useRef(null);
  const [other, setOther] = useState("");
  const [locText, setLocText] = useState("Search");

  const getPosition = async (type) => {
    Geolocation.getCurrentPosition(
      async (pos) => {
        setError("");
        console.log(pos);

        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setData({
          ...userData,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        if (type) {
          let tempCoords = {
            latitude: Number(pos.coords.latitude),
            longitude: Number(pos.coords.longitude),
          };
          mapView?.current?.animateToCoordinate(tempCoords, 1);
        }

        dispatch(
          getpinApi({
            ...userData,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            id: await getData(key.userId),
          })
        );
      },
      (e) => setError(e.message)
    );
  };

  const address = (lat, long) => {
    
    Geocoder.init("AIzaSyDc7vco9M079shtrY-uK7I3_uOajkDJVCE");
    Geocoder.from(lat, long)
      .then((json) => {
        setLocText(json.results[0].formatted_address);
      })
      .catch((err) => console.log(err));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const value = await getData(key.token);
      if (value != null && value != "") {
        setToken(value + "");
        dispatch(getprofileApi({ id: value + "" }));
      }
    }
    // function
    // let value = await getData(key.userId);
    fetchData();

    getPosition(false);
  }, []);

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

  useEffect(() => {
    if (userGetdata.length > 0) {
      setMarker(userGetdata);
    }
  }, [userGetdata]);

  useEffect(() => {
    if (feed) {
      if (submit) {
        setshowSorry(true);
        setSubmit(false);
      } else {
        setshowThankyou(true);
      }

      dispatch({ type: CLEAR_STATES });
    }
  }, [feed]);

  const openSearch = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        setLocText(place.address);
        let tempCoords = {
          latitude: Number(place.location.latitude),
          longitude: Number(place.location.longitude),
        };
        mapView?.current?.animateToCoordinate(tempCoords, 1);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={HomescrStyle.container}>
      {position.latitude != 0 && (
        <MapView
          ref={mapView}
          provider={'google'}
          style={HomescrStyle.mapView}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onMapReady={()=>{
            if(mapView!=null){
              mapView?.current?.animateCamera({
                zoom: 14,
              })
            }
            
          }}
          onRegionChangeComplete={(e) => {
            address(e.latitude, e.longitude);
          }}
        >
          {marker.length > 0 &&
            marker.map((item, index) => {
              return (
                <Marker
                  onPress={() => {
                    // console.log(item)
                    setshowProduct(true);
                    setpopupData(item);
                    dispatch({ type: ADD_PIN_DATA, payload: item.ProductType });
                    // // setPop(item.product_type.replace("\"",""))
                    setcurrentAddres(item.location);
                  }}
                  title={"Available"}
                  coordinate={{
                    latitude: item.lat == null ? 0 : parseFloat(item.lat),
                    longitude: item.lng == null ? 0 : parseFloat(item.lng),
                  }}
                >
                  <Image
                    source={Path.pinlocation}
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                  />
                </Marker>
              );
            })}

        
        </MapView>
      )}
      <CurruntLocation
        onPressLocation={() => {
          getPosition(true);
        }}
      />
        <View style={[HomescrStyle.markerView]}>
            <Image style={[HomescrStyle.markerImage]} source={Path.marker} />
          </View>

      <SearchBar
        onPress={() => {
          navigation.openDrawer();
        }}
        onPressSearch={openSearch}
        text={locText}
      />

      <FloatButton
        onPress={async () => {
          if ((await getData(key.userId)) != null) {
            navigation.navigate("Addnewpin");
          } else {
            alert("Please login first!");
          }
        }}
      />
      {showProduct && (
        <ProductsPopup
          // data={popData}
          renderItem={({ item, index }) => {
            return (
              <View style={HomescrStyle.listData}>
                <Text style={HomescrStyle.productsText}>{item.title}</Text>
                <View style={HomescrStyle.listType}>
                  <Text style={HomescrStyle.productsText}>
                    {item.isPaid == 1 ? "Paid" : "Free"}
                  </Text>
                </View>
              </View>
            );
          }}
          onPressLike={() => {
            if (token == null) {
              alert("Please login first!");
            } else {
              setshowProduct(false);
              setShow(true);
            }
          }}
          currentAddress={popupData.location}
          dispense_type={popupData.dispense_type}
          onClose={() => {
            setshowProduct(false);
            setList(false);
            setShow(false);
          }}
          onPressDislike={() => {
            if (token == null) {
              alert("Please login first!");
            } else {
              setshowDislike(true);
            }
          }}
          pressLocation={() => {
            Platform.OS == "ios"
              ? Linking.openURL(
                  `http://maps.apple.com/?saddr=${
                    position.latitude + "," + position.longitude
                  }&daddr=${popupData.lat + "," + popupData.lng}`
                )
              : Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&origin=${
                    position.latitude + "," + position.longitude
                  }&destination=${popupData.lat + "," + popupData.lng}`
                );
          }}
        />
      )}

      {show && (
        <PostiveFeeback1
          inputRef={input}
          data={selectData}
          value={other}
          onChangeText={(e) => setOther(e)}
          onCancel={(index) => {
            if (selectData[index].title == "Other") {
              setOther("");
              setSelect(0);
            } else {
              let data = [...listData];
              data[isIndex].select = false;
              setListData(data);
            }
            let filter = [...selectData];
            filter.splice(index, 1);
            setSelectData(filter);
          }}
          currentAddress={currentAddres}
          editable={isSelect == -2}
          text={"Select what you like"}
          onClose={() => {
            let filter = [];
            listData.map((item) => {
              filter.push({
                ...item,
                select: false,
              });
            });

            setListData(filter);

            setShow(false);
            setshowProduct(false);
            setText(false);
            setSelectData(false);
            setSelect(0);
            setOther("");
          }}
          onPress={() => {
            setList(true);
          }}
          onPressSubmit={async () => {
            if (selectData.length > 0) {
              if (selectData[0].title == "Other" && other == "") {
                alert("Please enter other specify reason");
              } else {
                var data = {
                  user_id: await getData(key.userId),
                  pin_id: popupData.id,
                  location: popupData.location,
                  like_Data: JSON.stringify(selectData),
                  other: other,
                };

                dispatch(feedBack(data));
              }
            } else {
              alert("Please select what you like");
            }
          }}
        />
      )}
      {showDislike && (
        <PostiveFeedback2
          inputRef={input}
          data={selectData}
          value={other}
          onChangeText={(e) => setOther(e)}
          onCancel={(index) => {
            if (selectData[index].title == "Other") {
              setSelect(0);
            }
            let data = [...listData1];
            data[index].select = false;
            setListData(data);

            let filter = [...selectData];
            filter.splice(index, 1);
            setSelectData(filter);
          }}
          currentAddress={currentAddres}
          editable={isSelect == -2}
          text={"Select what you like"}
          onClose={() => {
            let filter = [];
            listData1.map((item) => {
              filter.push({
                ...item,
                select: false,
              });
            });
            setListData1(filter);
            setshowDislike(false);
            setshowProduct(false);
            setText(false);
            setSelectData(false);
          }}
          onPressDrop={() => {
            setlistShow1(true);
          }}
          onSubmit={async () => {
            if (selectData.length > 0) {
              if (selectData[0].title == "Other" && other == "") {
                alert("Please enter other specify reason");
              } else {
                var data = {
                  user_id: await getData(key.userId),
                  pin_id: popupData.id,
                  location: popupData.location,
                  like_Data: JSON.stringify(selectData),
                  other: other,
                };
                setSubmit(true);
                dispatch(feedBack(data));
              }
            } else {
              alert("Please select what didn't you like");
            }
          }}
        />
      )}
      {showThankyou && (
        <ThankyouPopup
          onClose={() => {
            setOther("");
            setSelectData([]);
            setshowThankyou(false);
            setShow(false);
            setText(false);
          }}
        />
      )}
      {showSorry && (
        <SorryPopup
          onClose={() => {
            setOther("");
            setSelectData(DATA1);
            setshowSorry(false);
            setshowDislike(false);
            setshowProduct(false);
            setText(false);
          }}
        />
      )}
      {listShow && (
        <View style={HomescrStyle.feedbackList}>
          <View style={HomescrStyle.mainContainer}>
            <View
              style={{
                height: 30,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  let filter = [];
                  listData.map((item) => {
                    filter.push({
                      ...item,
                      select: false,
                    });
                  });

                  setListData(filter);
                  setList(false);
                }}
              >
                <Image
                  source={Path.cross}
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: "88%",
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{
                marginTop: 5,
              }}
              data={listData}
              renderItem={({ item, index }) => {
                return (
                  <Productbrands
                    show={item.select}
                    OnCheckPress={() => {
                      setOther("");
                      var data = [...listData];
                      data[index].select = !data[index].select;
                      setListData(data);
                      setSelect(0);
                      setIndex(index);
                    }}
                    text={item.title}
                  />
                );
              }}
            />
            <View style={HomescrStyle.secondContainer}>
              <Productbrands
                // workngg
                text={"Other"}
                show={isSelect == -2}
                OnCheckPress={() => {
                  setSelect(-2);
                  if (input != null) {
                    setTimeout(() => {
                      input.current.focus();
                    }, 500);
                  }
                  var data = [];
                  listData.map((item) => {
                    data.push({
                      ...item,
                      select: false,
                    });
                  });
                  setListData(data);
                  setSelectData([{ id: 7, title: "Other", select: true }]);
                  setList(!listShow);
                }}
              />
            </View>
            <View style={HomescrStyle.btnContainer}>
              <AppButton
                text={"Add"}
                color={"#000"}
                onPress={() => {
                  let filter = listData.filter((item) => {
                    return item.select == true;
                  });
                  setSelectData(filter);
                  setList(false);
                }}
              />
            </View>
          </View>
        </View>
      )}
      {listShow1 && (
        <View style={HomescrStyle.feedbackList}>
          <View style={HomescrStyle.mainContainer}>
            <View
              style={{
                height: 30,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  let filter = [];
                  listData1.map((item) => {
                    filter.push({
                      ...item,
                      select: false,
                    });
                  });
                  setListData1(filter);
                  setlistShow1(false);
                }}
              >
                <Image
                  source={Path.cross}
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: "88%",
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ marginTop: 5 }}
              data={listData1}
              renderItem={({ item, index }) => {
                return (
                  <Productbrands
                    show={item.select}
                    OnCheckPress={() => {
                      var data = [...listData1];
                      var _arr = [];
                      data[index].select = !data[index].select;
                      setListData(data);
                      setSelect(0);
                    }}
                    text={item.title}
                  />
                );
              }}
            />
            <View style={HomescrStyle.otherContainer}>
              <Productbrands
                text={"Other"}
                show={isSelect == -2}
                OnCheckPress={() => {
                  setSelect(-2);
                  if (input != null) {
                    setTimeout(() => {
                      input.current.focus();
                    }, 500);
                  }
                  var data = [];
                  listData1.map((item) => {
                    data.push({
                      ...item,
                      select: false,
                    });
                  });
                  setListData(data);
                  setSelectData([{ id: 7, title: "Other", select: true }]);
                  setlistShow1(!listShow1);
                }}
              />
            </View>
            <View style={HomescrStyle.btnContainer2}>
              <AppButton
                text={"Add"}
                color={"#000"}
                onPress={() => {
                  let filter = listData1.filter((item) => {
                    return item.select == true;
                  });
                  setSelectData(filter);

                  setlistShow1(false);
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
