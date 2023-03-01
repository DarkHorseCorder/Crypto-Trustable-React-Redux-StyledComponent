import { LOGIN_USER, LOGOUT_USER, SET_USER, RESET_USER, RECOVERY_PHRASE_VERIFY, SAVE_REGISTER_DATA, SET_RESPONSE_STATUS } from "../actions/user";
import jwt_decode from "jwt-decode";

const initialState = {
  isAuth: getIsAuth(),
  user: setInitUser(),
  isVerify: false,
  name: "",
  reigsterData: "",
  responseStatus: "",
};
function getIsAuth() {
  try {
    const serialized = localStorage.getItem('token');
    if (serialized === null) {
      return false;
    }
    return true;
  }
  catch (err) {
    return false;
  }
}
function setInitUser() {
  if (getIsAuth() === true) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded;
  } else {
    return null;
  }
}
export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.user,
        isAuth: true,
        isVerify: true
      };
    case LOGOUT_USER:
      return {
        isAuth: false,
        user: null,
        isVerify: false
      };

    case SET_USER:
      return {
        user: action.user,
        isAuth: true,
        isVerify: false
      };
    case RESET_USER:
      return initialState;
    case RECOVERY_PHRASE_VERIFY:
      return {
        isAuth: false,
        user: null,
        isVerify: true,
        name: action.name,
      };

    case SAVE_REGISTER_DATA:
      return {
        registerData: action.data
      };
    case SET_RESPONSE_STATUS:
      return {
        responseStatus: action.data
      }
    default:
      return state;
  }
}
