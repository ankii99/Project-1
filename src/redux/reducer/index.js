import { combineReducers } from "redux";
import { authReducer } from "./gernalReducers";


export default combineReducers({
    auth: authReducer
})