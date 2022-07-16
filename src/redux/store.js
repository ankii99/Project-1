import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import gernalReducers from './reducer'
const store = createStore(gernalReducers,applyMiddleware(thunk));

export default store;