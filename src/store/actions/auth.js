import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/auth";
import axios from "../../apis/axios";
import { LOG_IN, SIGN_UP } from "../../apis/apiRoutes";
export const login = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const data = await axios.post(LOG_IN, payload);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const register = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const data = await axios.post(SIGN_UP, payload);
    console.log("data", data);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
