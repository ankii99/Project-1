import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
export const HomescrStyle = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"yellow"
  },
  mapView: {
    flex: 1,
  },
  feedbackList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -60,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#000000AA",
  },
  mainContainer: {
    height: "55%",
    width: "95%",
    borderRadius: 20,
    // backgroundColor:"blue"
  },
  secondContainer: {
    // backgroundColor:"blue",
    borderRadius: 20,
    ...ifIphoneX(
      {
        marginBottom: 80,
      },
      {
        marginBottom: 10,
      }
    ),
  },
  otherContainer: {
    borderRadius: 20,
    ...ifIphoneX(
      {
        marginBottom: 140,
      },
      {
        marginBottom: 65,
      }
    ),
  },
  btnContainer: {
    ...ifIphoneX(
      {
        height: "14%",
      },
      {
        height: "11%",
      }
    ),

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer2: {
    ...ifIphoneX(
      {
        height: "14%",
      },
      {
        height: "11%",
      }
    ),

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
