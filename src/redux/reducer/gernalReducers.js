import {
  AUTH_REQUEST,
  CLEAR_STATES,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FORGOT_USER,
  GETPROFILE_USER,
  UPDATEPROFILE_USER,
  IMAGEUPLOAD_USER,
  ADDPIN_USER,
  GETPIN_USER,
  ADD_PIN_DATA,
  BLOCK_USER,
  CHANGEPASSWORD_USER,
  USER_ID,
  GET_PRODUCTS,
  FEED_BACK
} from "../constants";

const initialState = {
  user: null,
  isLoading: false,
  isNavigate: false,
  userProfile: "",
  userGetdata:[],
  pinData:[],
  isError: false,
  userId:null,
  products:null,
  feed:false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER: {
      return {
        ...state,
        isNavigate: true,
        isLoading: false,
      };
    }
    case CLEAR_STATES: {
      return {
        ...state,
        isNavigate: false,
        isLoading: false,
        feed: false
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        isNavigate: true,
        isLoading: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isNavigate: true,
        isLoading: false,
      };
    }
    case FORGOT_USER: {
      return {
        ...state,
        isNavigate: true,
        isLoading: false,
      };
    }
    case UPDATEPROFILE_USER: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case IMAGEUPLOAD_USER: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ADDPIN_USER: {
      return {
        ...state,
        isLoading: false,
        isNavigate: true,
      };
    }
    case GETPIN_USER: {
      return {
        ...state,
        isLoading: false,
        userGetdata: action.payload
      };
    }
    case GETPROFILE_USER: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case BLOCK_USER: {
      return {
        ...state,
        isError: true,
      };
    }
    case CHANGEPASSWORD_USER: {
      return {
        ...state,
        isNavigate: true,
      };
    }
    case ADD_PIN_DATA:
      console.log(action.payload)
      return {
        ...state,
        pinData: action.payload
      }
      case USER_ID:
        return{
          ...state,
          userId: action.payload
        }
        case GET_PRODUCTS:
          return{
            ...state,
            products:action.payload
          }
          case FEED_BACK:
            return{
              ...state,
              feed: true
            }
    default:
      return state;
  }
};
