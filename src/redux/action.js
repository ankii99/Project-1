import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Auth } from "../AppNavigation/ScreensName";
import { key } from "../Config/Key";
import { getData, setData, deleteData } from "../Config/storage";
import {
  AUTH_REQUEST,
  CLEAR_STATES,
  FORGOT_USER,
  GETPROFILE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  UPDATEPROFILE_USER,
  IMAGEUPLOAD_USER,
  GETPIN_USER,
  ADDPIN_USER,
  BLOCK_USER,
  CHANGEPASSWORD_USER,
  GET_PRODUCTS,
  FEED_BACK,
} from "./constants";

const config = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseurl = "http://3.13.224.128/api/";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  fetch(baseurl + "signup", {
    method: "POST",
    headers: config,
    body: userData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status) {
        setData(key.userId, res.data.id.toString());
        setData(key.token, res.token.toString());
        dispatch({ type: REGISTER_USER });
        alert(res.message);
      } else {
        alert(res.message);
        dispatch({ type: CLEAR_STATES });
      }
      console.log(res, "result");
    })
    .catch((err) => console.log("ERROR", err));
};
export const login = (userData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  fetch(baseurl + "login", {
    method: "POST",
    headers: config,
    body: userData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status) {
        setData(key.userId, res.data.id.toString());
        setData(key.token, res.token.toString());
        dispatch({ type: LOGIN_USER });
        alert(res.msg);
      } else {
        alert(res.message);
        dispatch({ type: CLEAR_STATES });
      }
      console.log(res, "result");
    })
    .catch((err) => console.log("ERROR", err));
};
export const changepassword = (userData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  fetch(baseurl + "changepassword", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer" + " " + (await getData(key.token)),
    },
    body: userData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "result");
      if (res.status) {
        alert(res.message);
        dispatch({ type: CHANGEPASSWORD_USER });
        dispatch({ type: CLEAR_STATES });
      } else if (res.user_status == 1) {
        dispatch({ type: BLOCK_USER });
      } else {
        alert(res.message);
        dispatch({ type: CLEAR_STATES });
      }
    })
    .catch((err) => console.log("ERROR", err));
};
export const forgotpassword = (userData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  fetch(baseurl + "send-mail", {
    method: "POST",
    headers: config,
    body: userData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status) {
        dispatch({ type: FORGOT_USER });
        alert(res.message);
      } else if (res.user_status == 1) {
        dispatch({ type: BLOCK_USER });
      } else {
        alert(res.message);
        dispatch({ type: CLEAR_STATES });
      }
    })
    .catch((err) => console.log("ERROR", err));
};
export const logout = (userData) => async (dispatch) => {
  // console.log(await getData(key.token));
  fetch(baseurl + "logout", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer" + " " + (await getData(key.token)),
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status) {
        deleteData(key.userId);
        deleteData(key.token);
        dispatch({ type: LOGOUT_USER });
        alert(res.message);
      } else {
        alert(res.message);
        dispatch({ type: CLEAR_STATES });
      }
      console.log(res, "result");
    })
    .catch((err) => console.log("ERROR", err));
};
export const getprofileApi = (userData) => async (dispatch) => {
  fetch(baseurl + "getprofile", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer " + (await getData(key.token)),
    },
    body: JSON.stringify({ id: await getData(key.userId) }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status) {
        console.log(res, "GEt User Profile");
        dispatch({ type: GETPROFILE_USER, payload: res.data });
      } else if (res.user_status == 1) {
        dispatch({ type: BLOCK_USER });
      } else {
        dispatch({ type: CLEAR_STATES });
      }
    })
    .catch((err) => console.log("ERROR", err));
};
export const updateprofileApi = (userData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  fetch(baseurl + "updateprofile", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer" + " " + (await getData(key.token)),
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "Update profile");
      if (res.status) {
        dispatch({ type: UPDATEPROFILE_USER });
        alert(res.message);
      } else if (res.user_status == 1) {
        dispatch({ type: BLOCK_USER });
      } else {
        dispatch({ type: CLEAR_STATES });
      }
      console.log(res, "result");
    })
    .catch((err) => console.log("ERROR", err));
};
export const imageuploadApi = (userData) => async (dispatch) => {
  console.log(userData, "input");
  let value = await getData(key.userId);
  var token = await getData(key.token);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  var photo = {
    uri: userData.image,
    type: "image/jpeg",
    name: "photo.jpg",
  };
  var formdata = new FormData();
  formdata.append("image", photo);
  formdata.append("id", userData.id + "");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  fetch("http://3.13.224.128/api/imageupload", requestOptions)
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "Image upload");
      if (res.status) {
        dispatch(getprofileApi());
        // dispatch({ type: IMAGEUPLOAD_USER });
        alert(res.message);
      } else if (res.user_status == 1) {
        dispatch({ type: BLOCK_USER });
      } else {
        // dispatch({ type: CLEAR_STATES });
        alert(res.message);
      }
      console.log(res, "result");
    })
    .catch((err) => console.log("ERROR", err));
};
export const addpinApi = (userData) => async (dispatch) => {
  // dispatch({ type: AUTH_REQUEST });
  console.log(userData);
  fetch(baseurl + "addpin", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer" + " " + (await getData(key.token)),
    },
    body: userData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "result");
      if (res.status) {
        alert(res.message);
        dispatch({ type: ADDPIN_USER });
        dispatch({ type: CLEAR_STATES });
      } else if (res.user_status == 1) {
        dispatch({ type: BLOCK_USER });
      } else {
        alert(res.message);
        dispatch({ type: CLEAR_STATES });
      }
    })
    .catch((err) => console.log("ERROR", err));
};
export const getpinApi = (userData) => async (dispatch) => {
  console.log("getpinparams", userData);
  fetch(baseurl + "getpin", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer" + " " + (await getData(key.token)),
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res, "resultPin");
      if (res.status) {
        // alert(res.message);
        dispatch({ type: GETPIN_USER, payload: res.data });
        dispatch({ type: CLEAR_STATES });
      } else if (res.user_status == 1) {
        dispatch({ type: BLOCK_USER });
      } else {
        alert(res.message);
        dispatch({ type: CLEAR_STATES });
      }
    })
    .catch((err) => console.log("ERROR", err));
};

export const getProducts = () => async (dispatch) => {
  fetch(baseurl + "getproducts", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer" + " " + (await getData(key.token)),
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status) {
        console.log(res)
        dispatch({ type: GET_PRODUCTS, payload: res });
      } else {
        alert(res.message);
      }
    })
    .catch((err) => console.log(err));
};

export const feedBack = (userData) => async (dispatch) => {
  fetch(baseurl + "feedback", {
    method: "POST",
    headers: {
      ...config,
      Authorization: "Bearer" + " " + (await getData(key.token)),
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.status) {
        dispatch({type: FEED_BACK})
      } else {
        alert(res.message);
      }
    })
    .catch((err) => console.log(err));
};
