import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Path } from "../Config/Path";
import { FlatList } from "react-native-gesture-handler";
import AppButton from "./AppButton";
import { AppColor } from "../Config/appColor";
import { getData } from "../Config/storage";
import { key } from "../Config/Key";
import { useSelector } from "react-redux";
// const DATA = [
//   { PRODUCT: "Tempons", TYPE: "Free" },
//   { PRODUCT: "Sanitary Pads", TYPE: "Free" },
//   { PRODUCT: "Cups", TYPE: "Paid" },
//   { PRODUCT: "Disc", TYPE: "Paid" },
// ];

export default function ProductsPopup({
  onClose,
  onPress,
  onPressLike,
  onPressDislike,
  currentAddress,
  dispense_type,
  pressLocation,
  product_type,
  renderItem
}) {
  const [token, setToken] = React.useState(null);
  const { pinData } = useSelector((state) => state.auth);
  React.useEffect(() => {
    async function getToken() {
      const value = await getData(key.token);
      if (value != null && value != "") {
        setToken(value);
      }
    }
    getToken();
  }, []);
  // console.log(pinData)

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={Path.background1}
          style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}
        >
          <View style={styles.firstView}>
            <TouchableOpacity onPress={onClose}>
              <Image source={Path.cross} style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.secondView}>
            <View style={styles.dispenserMachine}>
              {token == null ? (
                <Text style={styles.dispenserText}>Dispenser Machine</Text>
              ) : (
                <Text style={styles.dispenserText}>{dispense_type}</Text>
              )}
            </View>
            <View style={styles.libraryWashroom}>
              <Image
                source={Path.pinlocation}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
              />
              {token == null ? (
                <Text style={styles.libraryText}>libraryWashroom</Text>
              ) : (
                <Text style={styles.libraryText}>{currentAddress}</Text>
              )}
            </View>
          </View>
          <View style={styles.thirdView}>
            <View style={styles.productView}>
              <Text style={styles.productText}> Products </Text>
              <Text style={styles.productText}> Type </Text>
            </View>
            <View style={styles.lineView}></View>
          </View>
          <View style={styles.forthView}>
            <View style={styles.productList}>
              {/* {pinData.length > 0 && pinData.map((item,index)=>{

               return <View style={styles.listData}>
                         <Text style={styles.productsText}>{item.title}</Text>
                       <View style={styles.listType}>
                         <Text style={styles.productsText}>
                           {item.isPaid == 1 ? "Paid" : "Free"}
                        </Text>
                       </View>
                    </View>
              })
            } */}

              <FlatList
                showsVerticalScrollIndicator={false}
                data={pinData}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={styles.fifthView}>
            <TouchableOpacity style={styles.likeView} onPress={onPressLike}>
              <Image source={Path.like} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dislikeView}
              onPress={onPressDislike}
            >
              <Image source={Path.Dislike} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.sixView}>
            {/* <AppButton text={'Get Directions'} /> */}
            <TouchableOpacity
              onPress={pressLocation}
              style={styles.locationContainer}
            >
              <Image
                source={Path.pinlocation}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                  marginRight: 5,
                  tintColor: AppColor.APP_WHITE,
                }}
              />
              <Text style={styles.directionText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#000000AA",
  },
  mainContainer: {
    height: "65%",
    width: "95%",
    borderRadius: 20,
    backgroundColor: "#E7F8F8",
  },
  firstView: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
  },
  image: {
    height: 30,
    width: 30,
    tintColor: "#55A19F",
    marginLeft: "90%",
  },
  secondView: {
    width: "100%",
    height: "15%",
    alignItems: "center",
  },
  dispenserMachine: {
    width: null,
    height: "40%",
    borderRadius: 25,
    backgroundColor: "#E25D4B",
    justifyContent: "center",
    alignItems: "center",
  },
  dispenserText: {
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
    marginHorizontal: 10,
  },
  libraryWashroom: {
    height: "60%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  libraryText: {
    fontFamily: "Helvetica",
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
    // paddingHorizontal:15
  },
  thirdView: {
    height: "10%",
    width: "100%",
  },
  productView: {
    height: "60%",
    width: "68%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lineView: {
    marginTop: 10,
    backgroundColor: "#000000",
    height: 2,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  productText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Helvetica",
  },
  forthView: {
    height: "35%",
    width: "70%",
    alignSelf: "center",
    flexDirection: "row",
    // backgroundColor: "orange",
  },
  productList: {
    flex: 1,
    // backgroundColor:"red"
  },
  listData: {
    // height:"70%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 5,
    // backgroundColor:"blue"
  },
  productsText: {
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  listType: {
    width: 60,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#217C79",
  },
  fifthView: {
    // backgroundColor: "red",
    height: "15%",
    width: "40%",
    alignSelf: "center",
    flexDirection: "row",
  },
  likeView: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"green"
  },
  dislikeView: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"orange"
  },
  sixView: {
    height: "15%",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    height: "60%",
    width: "70%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: AppColor.APP_GREEN,
  },
  directionText: {
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "700",
    color: AppColor.APP_WHITE,
  },
});
